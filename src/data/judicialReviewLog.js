import deputies from "./deputies.js";
import senators from "./senators.js";
import index from "./judicial/generated/index.json" with { type: "json" };

/** Every roster member has a review state, including checks not yet started. */
const judicialReviewLog = Object.fromEntries([...deputies, ...senators].map(({ id }) => {
  const entry = index[id];
  return [id, {
    stage: entry?.stage ?? "not-started",
    lastCheckedAt: entry?.lastCheckedAt ?? null,
    result: entry?.result ?? null,
    readyForClean: entry?.readyForClean ?? false,
  }];
}));

export default judicialReviewLog;
