const judicialStatuses = {
  "not-reviewed": {
    id: "not-reviewed",
    label: "Verifica giudiziaria non effettuata",
    shortLabel: "Da verificare",
    category: "not-reviewed",
    color: "#9ca3af",
    final: false,
  },

  clean: {
    id: "clean",
    label: "Nessun procedimento pubblico noto",
    shortLabel: "Nessun procedimento pubblico noto",
    category: "clean",
    color: "#3a9d67",
    final: false,
  },

  investigated: {
    id: "investigated",
    label: "Indagato",
    shortLabel: "Indagato",
    category: "ongoing",
    color: "#d79a27",
    final: false,
  },

  charged: {
    id: "charged",
    label: "Imputato",
    shortLabel: "Imputato",
    category: "ongoing",
    color: "#d79a27",
    final: false,
  },

  trial: {
    id: "trial",
    label: "Processo in corso",
    shortLabel: "Processo in corso",
    category: "ongoing",
    color: "#d79a27",
    final: false,
  },

  "convicted-non-final": {
    id: "convicted-non-final",
    label: "Condanna non definitiva",
    shortLabel: "Condanna non definitiva",
    category: "non-final",
    color: "#c76b35",
    final: false,
  },

  "convicted-final": {
    id: "convicted-final",
    label: "Condanna definitiva",
    shortLabel: "Condanna definitiva",
    category: "final",
    color: "#b53d3d",
    final: true,
  },

  acquitted: {
    id: "acquitted",
    label: "Assolto",
    shortLabel: "Assolto",
    category: "concluded",
    color: "#71819b",
    final: true,
  },

  archived: {
    id: "archived",
    label: "Procedimento archiviato",
    shortLabel: "Archiviato",
    category: "concluded",
    color: "#71819b",
    final: true,
  },

  dismissed: {
    id: "dismissed",
    label: "Prosciolto / non luogo a procedere",
    shortLabel: "Prosciolto",
    category: "concluded",
    color: "#71819b",
    final: true,
  },

  prescribed: {
    id: "prescribed",
    label: "Reato prescritto",
    shortLabel: "Prescrizione",
    category: "concluded",
    color: "#71819b",
    final: true,
  },

  "plea-bargain": {
    id: "plea-bargain",
    label: "Patteggiamento",
    shortLabel: "Patteggiamento",
    category: "concluded",
    color: "#71819b",
    final: true,
  },

  multiple: {
    id: "multiple",
    label: "Più procedimenti documentati",
    shortLabel: "Più procedimenti",
    category: "multiple",
    color: "#667085",
    final: false,
  },
  "parliamentary-immunity": {
    id: "parliamentary-immunity",
    label: "Insindacabilità parlamentare deliberata",
    shortLabel: "Insindacabilità deliberata",
    category: "procedural",
    color: "#71819b",
    final: false,
  },
};

export const getJudicialStatus = (status) => {
  return (
    judicialStatuses[status] ?? {
      id: "unknown",
      label: "Stato non disponibile",
      shortLabel: "Non disponibile",
      category: "unknown",
      color: "#8b92a0",
      final: false,
    }
  );
};

export default judicialStatuses;
