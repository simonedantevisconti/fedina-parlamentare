import partyLogos from "./generated/partyLogos.js";

const parties = {
  FDI: {
    acronym: "FDI",
    name: "Fratelli d'Italia",
    color: "#213a75",
    logo: partyLogos.FDI,
  },

  PD: {
    acronym: "PD",
    name: "Partito Democratico",
    color: "#d94b4b",
    logo: partyLogos.PD,
  },

  LEGA: {
    acronym: "LEGA",
    name: "Lega",
    color: "#4a9f65",
    logo: partyLogos.LEGA,
  },

  FI: {
    acronym: "FI",
    name: "Forza Italia",
    color: "#4b74c9",
    logo: partyLogos.FI,
  },

  M5S: {
    acronym: "M5S",
    name: "MoVimento 5 Stelle",
    color: "#e0b62d",
    logo: partyLogos.M5S,
  },

  AZ: {
    acronym: "AZ",
    name: "Azione",
    color: "#4c8fbf",
    logo: partyLogos.AZ,
  },

  AVS: {
    acronym: "AVS",
    name: "Alleanza Verdi e Sinistra",
    color: "#6aaa55",
    logo: partyLogos.AVS,
  },

  NM: {
    acronym: "NM",
    name: "Noi Moderati",
    color: "#4f87a8",
    logo: partyLogos.NM,
  },

  IV: {
    acronym: "IV",
    name: "Italia Viva",
    color: "#d74f91",
    logo: partyLogos.IV,
  },

  MISTO: {
    acronym: "MISTO",
    name: "Misto",
    color: "#7d8592",
    logo: null,
  },
};

export const getParty = (acronym) => {
  return (
    parties[acronym] ?? {
      acronym: "MISTO",
      name: "Misto",
      color: "#7d8592",
      logo: null,
    }
  );
};

export default parties;
