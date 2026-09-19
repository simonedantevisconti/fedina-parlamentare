import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import deputies from "../src/data/deputies.js";
import senators from "../src/data/senators.js";

const rootDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(rootDirectory, "public", "politici");
const manifestPath = path.join(outputDirectory, "manifest.json");
const refresh = process.argv.includes("--refresh");
const inspectOnly = process.argv.includes("--inspect");

const CAMERA_ENDPOINT = "https://dati.camera.it/sparql";
const SENATO_ENDPOINT = "https://dati.senato.it/sparql";

const CAMERA_QUERY = `
PREFIX ocd: <http://dati.camera.it/ocd/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT DISTINCT ?member ?firstName ?lastName ?photo WHERE {
  ?member a ocd:deputato ;
    ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_19> ;
    foaf:firstName ?firstName ;
    foaf:surname ?lastName .
  OPTIONAL { ?member foaf:depiction ?photo . }
}
ORDER BY ?lastName ?firstName
`;

const SENATO_QUERY = `
PREFIX osr: <http://dati.senato.it/osr/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT DISTINCT ?member ?firstName ?lastName ?photo WHERE {
  ?member a osr:Senatore ;
    foaf:firstName ?firstName ;
    foaf:lastName ?lastName ;
    osr:mandato ?mandate .
  ?mandate osr:legislatura 19 .
  OPTIONAL { ?member foaf:depiction ?photo . }
}
ORDER BY ?lastName ?firstName
`;

const NAME_ALIASES = new Map(
  [
    ["pino bicchielli", "giuseppe bicchielli"],
    ["patty l abbate", "pasqua l abbate"],
    ["peppe de cristofaro", "giuseppe de cristofaro"],
    ["imma vietri", "maria immacolata vietri"],
    ["giandiego gatta", "giacomo diego gatta"],
    ["gianni cuperlo", "giovanni cuperlo"],
    ["carmen di lauro", "carmela di lauro"],
    ["elly schlein", "elena ethel schlein"],
    ["marina marchetto aliprandi", "marina marchetto"],
    ["gloria saccani jotti", "gloria saccani"],
  ].map(([localName, officialName]) => [localName, officialName]),
);

const normalizeName = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();

const valueOf = (binding, key) => binding[key]?.value?.trim() ?? "";

const querySparql = async (endpoint, query) => {
  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.set("query", query);
  requestUrl.searchParams.set("format", "application/sparql-results+json");

  const response = await fetch(requestUrl, {
    headers: {
      Accept: "application/sparql-results+json",
      "User-Agent": "Mozilla/5.0 FedinaParlamentare/1.0",
    },
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`SPARQL ${endpoint}: HTTP ${response.status}`);
  }

  const payload = await response.json();

  return payload.results.bindings.map((binding) => ({
    officialId: valueOf(binding, "member").split("/").at(-1),
    officialUrl: valueOf(binding, "member"),
    firstName: valueOf(binding, "firstName"),
    lastName: valueOf(binding, "lastName"),
    photoSourceUrl: valueOf(binding, "photo"),
  }));
};

const scoreCandidate = (politician, candidate) => {
  const localFullName = normalizeName(
    `${politician.firstName} ${politician.lastName}`,
  );
  const officialFullName = normalizeName(
    `${candidate.firstName} ${candidate.lastName}`,
  );
  const aliasedName = NAME_ALIASES.get(localFullName);

  if (localFullName === officialFullName || aliasedName === officialFullName) {
    return 100;
  }

  if (normalizeName(politician.lastName) !== normalizeName(candidate.lastName)) {
    return 0;
  }

  const localFirstName = normalizeName(politician.firstName);
  const officialFirstName = normalizeName(candidate.firstName);

  if (
    localFirstName.includes(officialFirstName) ||
    officialFirstName.includes(localFirstName)
  ) {
    return 90;
  }

  const localTokens = new Set(localFirstName.split(" "));
  const officialTokens = new Set(officialFirstName.split(" "));
  const sharedTokens = [...localTokens].filter((token) =>
    officialTokens.has(token),
  );

  if (sharedTokens.length > 0) {
    return 70 + sharedTokens.length;
  }

  if (localFirstName.charAt(0) === officialFirstName.charAt(0)) {
    return 20;
  }

  return 0;
};

const matchPoliticians = (politicians, candidates, chamber) => {
  const matched = [];
  const unmatched = [];
  const ambiguous = [];

  for (const politician of politicians) {
    const ranked = candidates
      .map((candidate) => ({
        candidate,
        score: scoreCandidate(politician, candidate),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    const best = ranked[0];
    const second = ranked[1];

    if (!best || best.score < 70) {
      unmatched.push({
        id: politician.id,
        name: `${politician.firstName} ${politician.lastName}`,
        reason: "nessuna corrispondenza sicura",
      });
      continue;
    }

    if (second && second.score === best.score) {
      ambiguous.push({
        id: politician.id,
        name: `${politician.firstName} ${politician.lastName}`,
        candidates: ranked
          .filter(({ score }) => score === best.score)
          .map(({ candidate }) =>
            `${candidate.firstName} ${candidate.lastName}`,
          ),
      });
      continue;
    }

    matched.push({
      id: politician.id,
      chamber,
      name: `${politician.firstName} ${politician.lastName}`,
      ...best.candidate,
    });
  }

  return { matched, unmatched, ambiguous };
};

const isJpeg = (buffer) =>
  buffer.length > 3 &&
  buffer[0] === 0xff &&
  buffer[1] === 0xd8 &&
  buffer[2] === 0xff;

const hasValidJpeg = async (filePath) => {
  try {
    return isJpeg(await readFile(filePath));
  } catch {
    return false;
  }
};

const getDownloadUrl = (record) => {
  if (record.chamber === "camera") {
    const numericId = record.officialId.match(/^d(\d+)_19$/)?.[1];

    if (!numericId) {
      throw new Error(`identificativo Camera inatteso: ${record.officialId}`);
    }

    return `https://politici.dovevannoinostrisoldi.com/politici/foto/dep-${numericId}`;
  }

  return `https://politici.dovevannoinostrisoldi.com/politici/foto/sen-s${record.officialId}`;
};

const downloadPortrait = async (record) => {
  const destination = path.join(outputDirectory, `${record.id}.jpg`);

  if (!refresh && (await hasValidJpeg(destination))) {
    return { ...record, localPath: `/politici/${record.id}.jpg`, cached: true };
  }

  const downloadUrl = getDownloadUrl(record);
  const response = await fetch(downloadUrl, {
    headers: {
      Accept: "image/jpeg,image/*;q=0.8",
      "Accept-Language": "it-IT,it;q=0.9,en;q=0.7",
      Referer:
        "https://politici.dovevannoinostrisoldi.com/",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  if (!isJpeg(buffer)) {
    throw new Error(
      `formato inatteso (${response.headers.get("content-type") ?? "sconosciuto"})`,
    );
  }

  const temporaryPath = `${destination}.tmp`;
  await writeFile(temporaryPath, buffer);
  await rename(temporaryPath, destination);

  return {
    ...record,
    localPath: `/politici/${record.id}.jpg`,
    downloadUrl,
    bytes: buffer.length,
  };
};

const runPool = async (records, concurrency, worker) => {
  const results = new Array(records.length);
  let nextIndex = 0;

  const runners = Array.from({ length: concurrency }, async () => {
    while (nextIndex < records.length) {
      const index = nextIndex;
      nextIndex += 1;

      try {
        results[index] = { ok: true, value: await worker(records[index]) };
      } catch (error) {
        results[index] = {
          ok: false,
          value: records[index],
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }
  });

  await Promise.all(runners);
  return results;
};

const cameraRecords = await querySparql(CAMERA_ENDPOINT, CAMERA_QUERY);
const senateRecords = await querySparql(SENATO_ENDPOINT, SENATO_QUERY);

if (inspectOnly) {
  console.log(JSON.stringify({
    camera: cameraRecords.slice(0, 3),
    senato: senateRecords.slice(0, 3),
  }, null, 2));
  process.exit(0);
}

const cameraMatches = matchPoliticians(deputies, cameraRecords, "camera");
const senateMatches = matchPoliticians(senators, senateRecords, "senato");
const allMatches = [...cameraMatches.matched, ...senateMatches.matched];

await mkdir(outputDirectory, { recursive: true });

const downloads = await runPool(allMatches, 4, downloadPortrait);
const successful = downloads
  .filter(({ ok }) => ok)
  .map(({ value }) => value)
  .sort((a, b) => a.id.localeCompare(b.id, "it"));
const failed = downloads
  .filter(({ ok }) => !ok)
  .map(({ value, error }) => ({ id: value.id, name: value.name, error }));

const manifest = {
  generatedAt: new Date().toISOString(),
  sources: {
    camera: CAMERA_ENDPOINT,
    senato: SENATO_ENDPOINT,
  },
  totals: {
    roster: deputies.length + senators.length,
    matched: allMatches.length,
    downloaded: successful.length,
    missing:
      cameraMatches.unmatched.length +
      senateMatches.unmatched.length +
      cameraMatches.ambiguous.length +
      senateMatches.ambiguous.length +
      failed.length,
  },
  portraits: Object.fromEntries(
    successful.map(({ id, cached: _cached, bytes: _bytes, ...record }) => [
      id,
      record,
    ]),
  ),
  unmatched: [...cameraMatches.unmatched, ...senateMatches.unmatched],
  ambiguous: [...cameraMatches.ambiguous, ...senateMatches.ambiguous],
  failed,
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

for (const result of downloads) {
  if (!result.ok) {
    await rm(path.join(outputDirectory, `${result.value.id}.jpg.tmp`), {
      force: true,
    });
  }
}

console.log(
  `${successful.length}/${deputies.length + senators.length} ritratti disponibili.`,
);

if (manifest.totals.missing > 0) {
  console.log(JSON.stringify({
    unmatched: manifest.unmatched,
    ambiguous: manifest.ambiguous,
    failed: manifest.failed,
  }, null, 2));
  process.exitCode = 2;
}
