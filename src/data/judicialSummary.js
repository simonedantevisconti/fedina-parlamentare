const ONGOING_STATUSES = ["investigated", "charged", "trial"];

const CONCLUDED_STATUSES = [
  "acquitted",
  "archived",
  "dismissed",
  "prescribed",
  "plea-bargain",
];

const HOMEPAGE_CONCLUDED_STATUSES = [
  ...CONCLUDED_STATUSES,
  "parliamentary-immunity",
  "annulled",
];

const HOMEPAGE_ONGOING_STATUSES = [
  ...ONGOING_STATUSES,
  "convicted-non-final",
  "outcome-unverified",
];

/*
 * Assegna ogni parlamentare a una sola categoria della homepage.
 * In presenza di più procedimenti applica la priorità editoriale:
 * condanna definitiva, esito concluso, procedimento in corso, nessun procedimento.
 */
export const getHomepageJudicialCategory = (summary) => {
  const statuses = summary?.uniqueStatuses ?? [];

  if (statuses.includes("convicted-final")) {
    return "convicted";
  }

  if (statuses.some((status) => HOMEPAGE_CONCLUDED_STATUSES.includes(status))) {
    return "concluded";
  }

  if (statuses.some((status) => HOMEPAGE_ONGOING_STATUSES.includes(status))) {
    return "ongoing";
  }

  if (summary?.proceedingCount > 0) {
    return "ongoing";
  }

  return "clean";
};

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

  const hasPrescribedProceedings = statuses.includes("prescribed");

  const hasPleaBargain = statuses.includes("plea-bargain");

  const hasConcludedProceedings = statuses.some((status) =>
    CONCLUDED_STATUSES.includes(status),
  );

  const proceedingCount = proceedings.length;

  let displayStatus = judicialStatus ?? "not-reviewed";

  /*
   * Se esistono più procedimenti con
   * esiti/stati differenti, non scegliamo
   * arbitrariamente uno stato principale.
   */
  if (uniqueStatuses.length > 1) {
    displayStatus = "multiple";
  }

  /*
   * Se tutti i procedimenti hanno
   * lo stesso stato, mostriamo quello.
   */
  if (uniqueStatuses.length === 1) {
    displayStatus = uniqueStatuses[0];
  }

  /*
   * Nessun procedimento e verifica completata:
   * manteniamo lo stato registrato,
   * normalmente "clean".
   */
  if (proceedingCount === 0 && judicialVerification?.reviewed) {
    displayStatus = judicialStatus ?? "clean";
  }

  /*
   * Nessun procedimento e nessuna verifica:
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

    hasPrescribedProceedings,

    hasPleaBargain,

  };
};

export default buildJudicialSummary;
