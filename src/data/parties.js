const parties = {
  // ======================================================
  // CAMERA / ALIAS GENERICI
  // ======================================================

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

  FdI: {
    acronym: "FdI",
    name: "Fratelli d'Italia",
    color: "#213a75",
  },

  M5S: {
    acronym: "M5S",
    name: "MoVimento 5 Stelle",
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

  // ======================================================
  // SENATO - XIX LEGISLATURA
  // ======================================================

  "PD-IDP": {
    acronym: "PD-IDP",
    name: "Partito Democratico - Italia Democratica e Progressista",
    color: "#d94b4b",
  },

  "FI-BP-PPE": {
    acronym: "FI-BP-PPE",
    name: "Forza Italia - Berlusconi Presidente - PPE",
    color: "#4b74c9",
  },

  "LSP-PSd'Az": {
    acronym: "LSP-PSd'Az",
    name: "Lega Salvini Premier - Partito Sardo d'Azione",
    color: "#4a9f65",
  },

  "IV-CR": {
    acronym: "IV-CR",
    name: "Italia Viva - Casa Riformista",
    color: "#d74f91",
  },

  "Cd'I-UDC-NM-MAIE-CP": {
    acronym: "Cd'I-UDC-NM-MAIE-CP",
    name: "Civici d'Italia-UDC-Noi Moderati (Noi con l'Italia, Coraggio Italia, Italia al Centro)-MAIE-Centro Popolare",
    color: "#4f87a8",
  },

  "Aut (SVP-PATT, Cb)": {
    acronym: "Aut (SVP-PATT, Cb)",
    name: "Per le Autonomie (SVP-PATT, Campobase)",
    color: "#7b5ea7",
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
      acronym: acronym ?? "N/D",
      name: acronym ?? "Gruppo non disponibile",
      color: "#8b92a0",
    }
  );
};

export default parties;
