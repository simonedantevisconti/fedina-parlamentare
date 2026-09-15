const parties = {
  FDI: {
    acronym: "FDI",
    name: "Fratelli d'Italia",
    color: "#213a75",
  },

  PD: {
    acronym: "PD",
    name: "Partito Democratico",
    color: "#d94b4b",
  },

  LEGA: {
    acronym: "LEGA",
    name: "Lega",
    color: "#4a9f65",
  },

  FI: {
    acronym: "FI",
    name: "Forza Italia",
    color: "#4b74c9",
  },

  M5S: {
    acronym: "M5S",
    name: "MoVimento 5 Stelle",
    color: "#e0b62d",
  },

  AZ: {
    acronym: "AZ",
    name: "Azione",
    color: "#4c8fbf",
  },

  AVS: {
    acronym: "AVS",
    name: "Alleanza Verdi e Sinistra",
    color: "#6aaa55",
  },

  NM: {
    acronym: "NM",
    name: "Noi Moderati",
    color: "#4f87a8",
  },

  IV: {
    acronym: "IV",
    name: "Italia Viva",
    color: "#d74f91",
  },

  MISTO: {
    acronym: "MISTO",
    name: "Misto",
    color: "#7d8592",
  },
};

export const getParty = (acronym) => {
  return (
    parties[acronym] ?? {
      acronym: "MISTO",
      name: "Misto",
      color: "#7d8592",
    }
  );
};

export default parties;
