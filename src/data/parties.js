const parties = {
  PD: {
    acronym: "PD",
    name: "Partito Democratico",
    color: "#d94b4b",
  },

  FDI: {
    acronym: "FDI",
    name: "Fratelli d'Italia",
    color: "#213a75",
  },

  M5S: {
    acronym: "M5S",
    name: "Movimento 5 Stelle",
    color: "#e0b62d",
  },

  FI: {
    acronym: "FI",
    name: "Forza Italia",
    color: "#4b74c9",
  },

  LEGA: {
    acronym: "LEGA",
    name: "Lega",
    color: "#4a9f65",
  },

  AVS: {
    acronym: "AVS",
    name: "Alleanza Verdi e Sinistra",
    color: "#6aaa55",
  },
};

export const getParty = (acronym) => {
  return (
    parties[acronym] ?? {
      acronym,
      name: acronym,
      color: "#8b92a0",
    }
  );
};

export default parties;
