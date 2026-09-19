import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(rootDirectory, "public", "partiti");
const generatedModulePath = path.join(
  rootDirectory,
  "src",
  "data",
  "generated",
  "partyLogos.js",
);

const LOGOS = [
  {
    acronym: "FDI",
    slug: "fratelli-italia",
    sourcePage: "https://www.fratelli-italia.it/logo/",
  },
  {
    acronym: "PD",
    slug: "partito-democratico",
    sourcePage: "https://www.partitodemocratico.it/",
  },
  {
    acronym: "LEGA",
    slug: "lega",
    sourcePage: "https://legaonline.it/",
  },
  {
    acronym: "FI",
    slug: "forza-italia",
    sourcePage: "https://forzaitalia.it/",
  },
  {
    acronym: "M5S",
    slug: "movimento-5-stelle",
    sourcePage: "https://www.movimento5stelle.eu/",
  },
  {
    acronym: "AZ",
    slug: "azione",
    sourcePage: "https://www.azione.it/",
  },
  {
    acronym: "AVS",
    slug: "alleanza-verdi-sinistra",
    sourcePage: "https://verdisinistra.it/",
  },
  {
    acronym: "NM",
    slug: "noi-moderati",
    sourcePage: "https://noimoderati.it/",
    downloadUrl: "https://www.noimoderati.it/assets/logo.png",
  },
  {
    acronym: "IV",
    slug: "italia-viva",
    sourcePage: "https://www.italiaviva.it/",
  },
];

const detectImageType = (buffer, contentType) => {
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { extension: "png", mimeType: "image/png" };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { extension: "jpg", mimeType: "image/jpeg" };
  }

  if (
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return { extension: "webp", mimeType: "image/webp" };
  }

  const beginning = buffer.subarray(0, 500).toString("utf8").trimStart();

  if (contentType?.includes("image/svg+xml") || beginning.startsWith("<svg")) {
    return { extension: "svg", mimeType: "image/svg+xml" };
  }

  throw new Error(`formato immagine non riconosciuto: ${contentType}`);
};

await mkdir(outputDirectory, { recursive: true });
await mkdir(path.dirname(generatedModulePath), { recursive: true });

const manifestEntries = [];
const generatedPaths = {};

for (const logo of LOGOS) {
  const downloadUrl =
    logo.downloadUrl ??
    `https://politici.dovevannoinostrisoldi.com/politici/simboli/${logo.slug}`;
  const response = await fetch(downloadUrl, {
    headers: {
      Accept: "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8",
      Referer: logo.sourcePage,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
    },
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`${logo.acronym}: HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const { extension, mimeType } = detectImageType(
    buffer,
    response.headers.get("content-type"),
  );
  const filename = `${logo.acronym.toLowerCase()}.${extension}`;
  const destination = path.join(outputDirectory, filename);
  const temporaryPath = `${destination}.tmp`;

  await writeFile(temporaryPath, buffer);
  await rename(temporaryPath, destination);

  generatedPaths[logo.acronym] = `/partiti/${filename}`;
  manifestEntries.push({
    acronym: logo.acronym,
    localPath: generatedPaths[logo.acronym],
    mimeType,
    bytes: buffer.length,
    sourcePage: logo.sourcePage,
    downloadUrl,
  });
}

await writeFile(
  path.join(outputDirectory, "manifest.json"),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      notice:
        "I simboli e i marchi appartengono ai rispettivi titolari e non indicano affiliazione o sostegno al progetto.",
      logos: manifestEntries,
      unavailable: {
        MISTO:
          "Il gruppo Misto non rappresenta un singolo partito e non ha un simbolo ufficiale unico.",
      },
    },
    null,
    2,
  )}\n`,
);

await writeFile(
  generatedModulePath,
  `// Generato da scripts/importPartyLogos.mjs.\nexport default ${JSON.stringify(generatedPaths, null, 2)};\n`,
);

console.log(`${manifestEntries.length}/${LOGOS.length} simboli scaricati.`);
