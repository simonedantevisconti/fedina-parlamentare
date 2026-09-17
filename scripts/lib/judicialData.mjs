import fs from "node:fs/promises";
import deputies from "../../src/data/deputies.js";
import senators from "../../src/data/senators.js";
import judicialStatuses from "../../src/data/judicialStatuses.js";

export const roster = [...deputies, ...senators];
export const root = new URL("../../", import.meta.url);
export const peopleDirectory = new URL("src/data/judicial/people/", root);

export async function readJudicialData() {
  const files = (await fs.readdir(peopleDirectory)).filter((file) => file.endsWith(".json")).sort();
  const entries = await Promise.all(files.map(async (file) => {
    const entry = JSON.parse(await fs.readFile(new URL(file, peopleDirectory), "utf8"));
    if (file !== `${entry.id}.json`) throw new Error(`ID does not match filename: ${file}`);
    return entry;
  }));
  return Object.fromEntries(entries.map((entry) => [entry.id, entry]));
}

export function validateJudicialData(entries) {
  const errors = [];
  const ids = new Set(roster.map((person) => person.id));
  const proceedingIds = new Set();
  const stages = new Set(["not-started", "preliminary", "deep-review-needed", "legacy-record", "complete", "complete-with-follow-up", "complete-with-model-update-needed"]);
  const validDate = (value) => value === null || (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value);
  if (ids.size !== roster.length) errors.push("Duplicate IDs in the parliamentary roster");
  for (const id of ids) if (!entries[id]) errors.push(`${id}: missing review file`);
  for (const [id, entry] of Object.entries(entries)) {
    if (!ids.has(id)) errors.push(`${id}: person outside the supplied roster`);
    if (entry.schemaVersion !== 1 || entry.id !== id || !entry.review?.stage) errors.push(`${id}: invalid schema`);
    if (!stages.has(entry.review?.stage)) errors.push(`${id}: unknown review stage`);
    if (!validDate(entry.review?.lastCheckedAt)) errors.push(`${id}: invalid review date`);
    if (entry.review?.readyForClean && (!entry.record || entry.record.judicialStatus !== "clean")) errors.push(`${id}: completed clean review has no matching record`);
    if (entry.review?.stage === "not-started" && entry.review.lastCheckedAt !== null) errors.push(`${id}: an unstarted review cannot have a check date`);
    const record = entry.record;
    if (!record) continue;
    if (!judicialStatuses[record.judicialStatus] || !record.judicialVerification || !Array.isArray(record.proceedings)) {
      errors.push(`${id}: incomplete record`);
      continue;
    }
    if (record.judicialStatus === "clean" && record.proceedings.length) errors.push(`${id}: clean status with proceedings`);
    if (!validDate(record.judicialVerification.lastVerifiedAt)) errors.push(`${id}: invalid verification date`);
    for (const proceeding of record.proceedings) {
      if (!proceeding.id || proceedingIds.has(proceeding.id)) errors.push(`${id}: duplicate or missing proceeding ID`);
      proceedingIds.add(proceeding.id);
      if (!judicialStatuses[proceeding.status]) errors.push(`${id}: unknown proceeding status ${proceeding.status}`);
      if (!proceeding.title || !proceeding.description || !proceeding.sources?.length) errors.push(`${id}: proceeding without description or sources`);
      if (proceeding.status === "convicted-final" && proceeding.finalJudgment !== true) errors.push(`${id}: final conviction without recorded finality`);
      for (const key of ["startDate", "lastUpdate", "finalJudgmentDate"]) {
        if (!validDate(proceeding[key])) errors.push(`${id}: invalid ${key}`);
      }
      if (proceeding.finalJudgmentDate && proceeding.finalJudgment !== true) errors.push(`${id}: final date without documented finality`);
      for (const source of proceeding.sources ?? []) {
        try {
          if (!["https:", "http:"].includes(new URL(source.url).protocol)) throw new Error();
        } catch { errors.push(`${id}: invalid source URL`); }
        if (!source.publisher || !source.accessedAt) errors.push(`${id}: incomplete source metadata`);
        if (!validDate(source.publicationDate) || !validDate(source.accessedAt)) errors.push(`${id}: invalid source date`);
      }
    }
  }
  return errors;
}

export function buildIndex(entries) {
  return Object.fromEntries(Object.entries(entries).filter(([, entry]) => entry.review.stage !== "not-started" || entry.record).map(([id, { review, record }]) => [id, {
    stage: review.stage,
    lastCheckedAt: review.lastCheckedAt,
    result: review.result,
    readyForClean: review.readyForClean === true,
    ...(record ? {
      judicialStatus: record.judicialStatus,
      judicialVerification: record.judicialVerification,
      proceedingStatuses: record.proceedings.map(({ status }) => status),
    } : {}),
  }]));
}

export function getCoverage(entries) {
  const groups = { "not-started": [], preliminary: [], "follow-up": [], complete: [] };
  const findingsWithoutRecord = [];
  for (const person of roster) {
    const { review, record } = entries[person.id] ?? { review: { stage: "not-started" } };
    let category = "preliminary";
    if (review.stage === "not-started") category = "not-started";
    else if (review.stage === "complete" && (record || review.readyForClean)) category = "complete";
    else if (review.stage.includes("follow-up") || review.stage.includes("needed") || review.stage === "complete") category = "follow-up";
    groups[category].push({ id: person.id, name: `${person.firstName} ${person.lastName}`, chamber: person.chamber });
    if (review.result?.includes("public-proceeding") && !record) findingsWithoutRecord.push(person.id);
  }
  return {
    total: roster.length,
    counts: Object.fromEntries(Object.entries(groups).map(([stage, people]) => [stage, people.length])),
    findingsWithoutRecord,
    groups,
  };
}
