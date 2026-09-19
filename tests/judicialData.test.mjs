import test from "node:test";
import assert from "node:assert/strict";
import { readJudicialData, validateJudicialData, roster, getCoverage } from "../scripts/lib/judicialData.mjs";
import { buildJudicialSummary, getHomepageJudicialCategory } from "../src/data/judicialSummary.js";
import politicians from "../src/data/politicians.js";
import judicialReviewLog from "../src/data/judicialReviewLog.js";
import { loadJudicialRecord } from "../src/data/judicialRecords.js";

const entries = await readJudicialData();

test("every roster member has one valid review file and a runtime review state", () => {
  assert.deepEqual(validateJudicialData(entries), []);
  assert.equal(Object.keys(entries).length, roster.length);
  assert.equal(Object.keys(judicialReviewLog).length, roster.length);
  assert.equal(politicians.length, roster.length);
});

test("lightweight cards preserve every status and count from full proceedings", () => {
  for (const person of politicians) {
    const record = entries[person.id].record;
    const expected = buildJudicialSummary(record ?? {
      judicialStatus: "not-reviewed", judicialVerification: { reviewed: false }, proceedings: [],
    });
    assert.deepEqual(person.judicialSummary, expected, person.id);
    assert.equal(person.judicialStatus, expected.displayStatus, person.id);
    assert.equal(person.proceedings.length, 0, "list views must not contain full proceedings");
  }
});

test("unstarted checks cannot be counted as complete or clean", () => {
  const coverage = getCoverage(entries);
  assert.equal(Object.values(coverage.counts).reduce((sum, count) => sum + count, 0), roster.length);
  for (const person of politicians.filter((item) => item.judicialReview.stage === "not-started")) {
    assert.equal(person.judicialStatus, "not-reviewed");
    assert.equal(person.judicialReview.lastCheckedAt, null);
  }
});

test("details load independently and unknown IDs do not load a file", async () => {
  assert.deepEqual(await loadJudicialRecord("maria-elena-boschi"), entries["maria-elena-boschi"]);
  assert.equal(await loadJudicialRecord("../parties"), null);
  assert.equal(await loadJudicialRecord("constructor"), null);
});

test("mixed outcomes retain both conviction and acquittal information", () => {
  const summary = buildJudicialSummary({ proceedings: [{ status: "convicted-final" }, { status: "acquitted" }] });
  assert.equal(summary.displayStatus, "multiple");
  assert.equal(summary.hasFinalConviction, true);
  assert.equal(summary.hasAcquittals, true);
});

test("homepage categories include every politician once and respect priority", () => {
  const counts = { clean: 0, ongoing: 0, convicted: 0, concluded: 0 };

  for (const person of politicians) {
    const category = getHomepageJudicialCategory(person.judicialSummary);
    assert.ok(category in counts, `${person.id}: unknown homepage category`);
    counts[category] += 1;
  }

  assert.equal(Object.values(counts).reduce((sum, count) => sum + count, 0), politicians.length);

  const mixed = buildJudicialSummary({
    proceedings: [
      { status: "convicted-final" },
      { status: "acquitted" },
      { status: "trial" },
    ],
  });
  assert.equal(getHomepageJudicialCategory(mixed), "convicted");
});
