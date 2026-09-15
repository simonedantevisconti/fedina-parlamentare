const parties = {
  // ======================================================
  // GRUPPI COMUNI / CAMERA
  // ======================================================

  FDI: {
    acronym: "FDI",
    name: "Fratelli d'Italia",
    color: "#213a75",
  },

  "PD-IDP": {
    acronym: "PD-IDP",
    name: "Partito Democratico - Italia Democratica e Progressista",
    color: "#d94b4b",
  },

  LEGA: {
    acronym: "LEGA",
    name: "Lega - Salvini Premier",
    color: "#4a9f65",
  },

  "FI-PPE": {
    acronym: "FI-PPE",
    name: "Forza Italia - Berlusconi Presidente - PPE",
    color: "#4b74c9",
  },

  M5S: {
    acronym: "M5S",
    name: "MoVimento 5 Stelle",
    color: "#e0b62d",
  },

  "AZ-PER-RE": {
    acronym: "AZ-PER-RE",
    name: "Azione - Popolari Europeisti Riformatori - Renew Europe",
    color: "#4c8fbf",
  },

  AVS: {
    acronym: "AVS",
    name: "Alleanza Verdi e Sinistra",
    color: "#6aaa55",
  },

  "NM(N-C-U-I)M-CP": {
    acronym: "NM(N-C-U-I)M-CP",
    name: "Noi Moderati (Noi con l'Italia, Coraggio Italia, UDC e Italia al Centro) - MAIE - Centro Popolare",
    color: "#4f87a8",
  },

  "IV-CR": {
    acronym: "IV-CR",
    name: "Italia Viva - Casa Riformista",
    color: "#d74f91",
  },

  "MISTO-FNV-F": {
    acronym: "MISTO-FNV-F",
    name: "Misto - Futuro Nazionale Vannacci - Free",
    color: "#9b6b46",
  },

  "MISTO-MIN.LING.": {
    acronym: "MISTO-MIN.LING.",
    name: "Misto - Minoranze Linguistiche",
    color: "#7b5ea7",
  },

  "MISTO-+EUROPA-SUE": {
    acronym: "MISTO-+EUROPA-SUE",
    name: "Misto - +Europa - Stati Uniti d'Europa",
    color: "#d65a8a",
  },

  MISTO: {
    acronym: "MISTO",
    name: "Misto",
    color: "#7d8592",
  },

  // ======================================================
  // SENATO - SIGLE SPECIFICHE
  // ======================================================

  "LSP-PSd'Az": {
    acronym: "LSP-PSd'Az",
    name: "Lega Salvini Premier - Partito Sardo d'Azione",
    color: "#4a9f65",
  },

  "FI-BP-PPE": {
    acronym: "FI-BP-PPE",
    name: "Forza Italia - Berlusconi Presidente - PPE",
    color: "#4b74c9",
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
};

/*
 * Alias mantenuti per compatibilità con eventuali
 * mock o vecchi record ancora presenti nel progetto.
 */
const partyAliases = {
  PD: "PD-IDP",
  FdI: "FDI",
  FI: "FI-PPE",
  AVS: "AVS",
};

export const getParty = (acronym) => {
  if (!acronym) {
    return {
      acronym: "N/D",
      name: "Gruppo non disponibile",
      color: "#8b92a0",
    };
  }

  const normalizedAcronym = partyAliases[acronym] ?? acronym;

  return (
    parties[normalizedAcronym] ?? {
      acronym,
      name: acronym,
      color: "#8b92a0",
    }
  );
};

export default parties;
