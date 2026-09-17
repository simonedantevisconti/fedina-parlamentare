import { getParty } from "./parties.js";

export const slugify = (value) => value.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/['’]/g, " ")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .toLowerCase();

export function createPolitician({ firstName, lastName, party, chamber, senatorType = "elected", startDate = null }) {
  const id = slugify(`${firstName}-${lastName}`);
  const isSenator = chamber === "senato";
  return {
    id,
    firstName,
    lastName,
    chamber,
    party: getParty(party),
    photo: `/politici/${id}.jpg`,
    legislature: "XIX",
    mandateNumber: null,
    mandate: { startDate, endDate: null, inOffice: true },
    ...(isSenator ? { senatorType } : {}),
    constituency: null,
    birthDate: null,
    birthPlace: null,
    institutionalRole: isSenator ? "Senatore" : "Deputato",
    institutionalProfileUrl: "",
    institutionalVerification: {
      lastVerifiedAt: "2026-09-16",
      sourceUrl: isSenator
        ? "https://www.senato.it/composizione/senatori/elenco-alfabetico"
        : "https://www.camera.it/deputati/elenco",
    },
    judicialStatus: "not-reviewed",
    judicialVerification: { reviewed: false, lastVerifiedAt: null },
    proceedings: [],
  };
}
