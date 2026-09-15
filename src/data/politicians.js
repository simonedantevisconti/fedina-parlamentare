import deputies from "./deputies";
import senators from "./senators";

import judicialRecords from "./judicialRecords";

import { buildJudicialSummary } from "./judicialSummary";

const institutionalPoliticians = [...deputies, ...senators];

const politicians = institutionalPoliticians.map((politician) => {
  const judicialRecord = judicialRecords[politician.id];

  const mergedPolitician = judicialRecord
    ? {
        ...politician,

        judicialStatus: judicialRecord.judicialStatus,

        judicialVerification: judicialRecord.judicialVerification,

        proceedings: judicialRecord.proceedings ?? [],
      }
    : politician;

  const judicialSummary = buildJudicialSummary({
    judicialStatus: mergedPolitician.judicialStatus,

    judicialVerification: mergedPolitician.judicialVerification,

    proceedings: mergedPolitician.proceedings,
  });

  return {
    ...mergedPolitician,

    judicialSummary,

    /*
     * È lo stato sintetico usato dalle card
     * e dall'emiciclo.
     */
    judicialStatus: judicialSummary.displayStatus,
  };
});

export default politicians;
