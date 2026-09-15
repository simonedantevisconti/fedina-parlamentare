const deputies = [
  {
    id: "alessandro-bianchi",

    firstName: "Alessandro",
    lastName: "Bianchi",

    chamber: "camera",

    party: {
      name: "Partito Democratico",
      acronym: "PD",
    },

    photo: "/politici/alessandro-bianchi.jpg",

    legislature: "XIX",
    mandateNumber: 2,
    constituency: "Lombardia 1",

    birthDate: "1974-06-18",
    birthPlace: "Milano",

    institutionalRole: "Deputato",

    institutionalProfileUrl: "",

    institutionalVerification: {
      lastVerifiedAt: null,
      sourceUrl: "",
    },

    judicialStatus: "clean",

    judicialVerification: {
      reviewed: true,
      lastVerifiedAt: "2026-09-15",
    },

    proceedings: [],
  },

  {
    id: "marco-conti",

    firstName: "Marco",
    lastName: "Conti",

    chamber: "camera",

    party: {
      name: "Fratelli d'Italia",
      acronym: "FDI",
    },

    photo: "/politici/marco-conti.jpg",

    legislature: "XIX",
    mandateNumber: 1,
    constituency: "Lazio 1",

    birthDate: "1980-03-24",
    birthPlace: "Roma",

    institutionalRole: "Deputato",

    institutionalProfileUrl: "",

    institutionalVerification: {
      lastVerifiedAt: null,
      sourceUrl: "",
    },

    judicialStatus: "trial",

    judicialVerification: {
      reviewed: true,
      lastVerifiedAt: "2026-09-15",
    },

    proceedings: [
      {
        id: "proc-marco-conti-001",

        title: "Procedimento giudiziario di esempio",

        allegedOffence: "Corruzione",

        status: "trial",

        court: "Tribunale di esempio",

        startDate: "2024-04-12",
        lastUpdate: "2026-09-10",

        description:
          "Procedimento mock utilizzato esclusivamente per sviluppare e testare l'interfaccia di Fedina Parlamentare.",

        finalJudgment: false,

        timeline: [
          {
            date: "2024-04-12",
            title: "Apertura del procedimento",
          },
          {
            date: "2025-02-18",
            title: "Rinvio a giudizio",
          },
          {
            date: "2026-09-10",
            title: "Processo in corso",
          },
        ],

        sources: [
          {
            name: "Fonte di esempio",
            publisher: "",
            url: "#",
            publicationDate: "",
            accessedAt: "",
            type: "mock",
          },
        ],
      },
    ],
  },

  {
    id: "giulia-ferrari",

    firstName: "Giulia",
    lastName: "Ferrari",

    chamber: "camera",

    party: {
      name: "Movimento 5 Stelle",
      acronym: "M5S",
    },

    photo: "/politici/giulia-ferrari.jpg",

    legislature: "XIX",
    mandateNumber: 3,
    constituency: "Campania 1",

    birthDate: "1978-09-11",
    birthPlace: "Napoli",

    institutionalRole: "Deputato",

    institutionalProfileUrl: "",

    institutionalVerification: {
      lastVerifiedAt: null,
      sourceUrl: "",
    },

    judicialStatus: "archived",

    judicialVerification: {
      reviewed: true,
      lastVerifiedAt: "2026-09-15",
    },

    proceedings: [
      {
        id: "proc-giulia-ferrari-001",

        title: "Procedimento archiviato di esempio",

        allegedOffence: "Ipotesi di reato di esempio",

        status: "archived",

        court: "Procura di esempio",

        startDate: "2022-06-15",
        lastUpdate: "2023-11-08",

        description:
          "Procedimento mock concluso con archiviazione, utilizzato esclusivamente per testare l'interfaccia.",

        finalJudgment: false,

        timeline: [
          {
            date: "2022-06-15",
            title: "Avvio delle indagini",
          },
          {
            date: "2023-11-08",
            title: "Procedimento archiviato",
          },
        ],

        sources: [
          {
            name: "Fonte di esempio",
            publisher: "",
            url: "#",
            publicationDate: "",
            accessedAt: "",
            type: "mock",
          },
        ],
      },
    ],
  },

  {
    id: "andrea-gallo",

    firstName: "Andrea",
    lastName: "Gallo",

    chamber: "camera",

    party: {
      name: "Forza Italia",
      acronym: "FI",
    },

    photo: "/politici/andrea-gallo.jpg",

    legislature: "XIX",
    mandateNumber: 2,
    constituency: "Sicilia 2",

    birthDate: "1968-11-03",
    birthPlace: "Palermo",

    institutionalRole: "Deputato",

    institutionalProfileUrl: "",

    institutionalVerification: {
      lastVerifiedAt: null,
      sourceUrl: "",
    },

    judicialStatus: "convicted-final",

    judicialVerification: {
      reviewed: true,
      lastVerifiedAt: "2026-09-15",
    },

    proceedings: [
      {
        id: "proc-andrea-gallo-001",

        title: "Procedimento giudiziario di esempio",

        offence: "Frode",

        status: "convicted-final",

        court: "Tribunale di esempio",

        startDate: "2020-05-14",
        lastUpdate: "2025-10-20",

        description:
          "Procedimento mock utilizzato esclusivamente per lo sviluppo dell'applicazione.",

        finalJudgment: true,
        finalJudgmentDate: "2025-10-20",

        timeline: [
          {
            date: "2020-05-14",
            title: "Apertura del procedimento",
          },
          {
            date: "2022-07-05",
            title: "Condanna in primo grado",
          },
          {
            date: "2024-02-10",
            title: "Sentenza di appello",
          },
          {
            date: "2025-10-20",
            title: "Sentenza definitiva",
          },
        ],

        sources: [
          {
            name: "Fonte di esempio",
            publisher: "",
            url: "#",
            publicationDate: "",
            accessedAt: "",
            type: "mock",
          },
        ],
      },
    ],
  },

  {
    id: "laura-martini",

    firstName: "Laura",
    lastName: "Martini",

    chamber: "camera",

    party: {
      name: "Lega",
      acronym: "LEGA",
    },

    photo: "/politici/laura-martini.jpg",

    legislature: "XIX",
    mandateNumber: 1,
    constituency: "Veneto 1",

    birthDate: "1982-01-29",
    birthPlace: "Verona",

    institutionalRole: "Deputato",

    institutionalProfileUrl: "",

    institutionalVerification: {
      lastVerifiedAt: null,
      sourceUrl: "",
    },

    judicialStatus: "investigated",

    judicialVerification: {
      reviewed: true,
      lastVerifiedAt: "2026-09-15",
    },

    proceedings: [
      {
        id: "proc-laura-martini-001",

        title: "Indagine di esempio",

        allegedOffence: "Ipotesi di reato di esempio",

        status: "investigated",

        court: "Procura di esempio",

        startDate: "2026-01-20",
        lastUpdate: "2026-08-28",

        description:
          "Indagine mock ancora in corso utilizzata esclusivamente per testare lo stato indagato.",

        finalJudgment: false,

        timeline: [
          {
            date: "2026-01-20",
            title: "Avvio delle indagini",
          },
          {
            date: "2026-08-28",
            title: "Indagine in corso",
          },
        ],

        sources: [
          {
            name: "Fonte di esempio",
            publisher: "",
            url: "#",
            publicationDate: "",
            accessedAt: "",
            type: "mock",
          },
        ],
      },
    ],
  },

  {
    id: "matteo-romano",

    firstName: "Matteo",
    lastName: "Romano",

    chamber: "camera",

    party: {
      name: "Alleanza Verdi e Sinistra",
      acronym: "AVS",
    },

    photo: "/politici/matteo-romano.jpg",

    legislature: "XIX",
    mandateNumber: 1,
    constituency: "Emilia-Romagna",

    birthDate: "1985-07-07",
    birthPlace: "Bologna",

    institutionalRole: "Deputato",

    institutionalProfileUrl: "",

    institutionalVerification: {
      lastVerifiedAt: null,
      sourceUrl: "",
    },

    judicialStatus: "clean",

    judicialVerification: {
      reviewed: true,
      lastVerifiedAt: "2026-09-15",
    },

    proceedings: [],
  },
];

export default deputies;
