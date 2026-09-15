const ONGOING_STATUSES = ["investigated", "charged", "trial"];

const CONCLUDED_STATUSES = ["acquitted", "archived", "dismissed"];

export const buildJudicialSummary = ({
  judicialStatus,
  judicialVerification,
  proceedings = [],
}) => {
  const statuses = proceedings
    .map((proceeding) => proceeding.status)
    .filter(Boolean);

  const uniqueStatuses = [...new Set(statuses)];

  const hasFinalConviction = statuses.includes("convicted-final");

  const hasNonFinalConviction = statuses.includes("convicted-non-final");

  const hasOngoingProceedings = statuses.some((status) =>
    ONGOING_STATUSES.includes(status),
  );

  const hasAcquittals = statuses.includes("acquitted");

  const hasArchivedProceedings = statuses.includes("archived");

  const hasDismissedProceedings = statuses.includes("dismissed");

  const hasConcludedProceedings = statuses.some((status) =>
    CONCLUDED_STATUSES.includes(status),
  );

  const proceedingCount = proceedings.length;

  let displayStatus = judicialStatus ?? "not-reviewed";

  /*
   * Se esistono più procedimenti con esiti/stati differenti,
   * non ne scegliamo arbitrariamente uno come rappresentativo.
   */
  if (uniqueStatuses.length > 1) {
    displayStatus = "multiple";
  }

  /*
   * Se esiste un solo tipo di stato nei procedimenti,
   * possiamo mostrarlo direttamente.
   */
  if (uniqueStatuses.length === 1) {
    displayStatus = uniqueStatuses[0];
  }

  /*
   * Nessun procedimento e verifica completata:
   * manteniamo lo stato registrato, normalmente "clean".
   */
  if (proceedingCount === 0 && judicialVerification?.reviewed) {
    displayStatus = judicialStatus ?? "clean";
  }

  /*
   * Nessuna verifica:
   * resta "not-reviewed".
   */
  if (proceedingCount === 0 && !judicialVerification?.reviewed) {
    displayStatus = "not-reviewed";
  }

  return {
    displayStatus,

    proceedingCount,

    uniqueStatuses,

    hasFinalConviction,

    hasNonFinalConviction,

    hasOngoingProceedings,

    hasConcludedProceedings,

    hasAcquittals,

    hasArchivedProceedings,

    hasDismissedProceedings,
  };
};

export default buildJudicialSummary;
