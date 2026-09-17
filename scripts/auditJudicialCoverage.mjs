import { readJudicialData, validateJudicialData, getCoverage } from "./lib/judicialData.mjs";

const entries = await readJudicialData();
const errors = validateJudicialData(entries);
const { groups, ...coverage } = getCoverage(entries);
console.log(JSON.stringify({ ...coverage, errors, ...(process.argv.includes("--list") ? { groups } : {}) }, null, 2));
if (errors.length) process.exitCode = 1;
