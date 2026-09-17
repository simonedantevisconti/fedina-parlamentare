import deputies from "./deputies.js";
import senators from "./senators.js";

import judicialIndex from "./judicial/generated/index.json" with { type: "json" };
import judicialReviewLog from "./judicialReviewLog.js";

import { buildJudicialSummary } from "./judicialSummary.js";

const institutionalPoliticians = [...deputies, ...senators];

const politicians = institutionalPoliticians.map((politician) => {
  const judicialRecord = judicialIndex[politician.id];

  const mergedPolitician = judicialRecord?.judicialStatus
    ? {
        ...politician,

        judicialStatus: judicialRecord.judicialStatus,

        judicialVerification: judicialRecord.judicialVerification,

      }
    : politician;

  const judicialSummary = buildJudicialSummary({
    judicialStatus: mergedPolitician.judicialStatus,

    judicialVerification: mergedPolitician.judicialVerification,

    proceedings: (judicialRecord?.proceedingStatuses ?? []).map((status) => ({ status })),
  });

  return {
    ...mergedPolitician,

    judicialSummary,
    judicialReview: judicialReviewLog[politician.id],

    /*
     * È lo stato sintetico usato dalle card
     * e dall'emiciclo.
     */
    judicialStatus: judicialSummary.displayStatus,
  };
});

export default politicians;
