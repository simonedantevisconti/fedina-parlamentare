const politicians = [
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

    judicialStatus: "clean",

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

    judicialStatus: "trial",

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
            url: "#",
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

    judicialStatus: "archived",

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
            url: "#",
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

    judicialStatus: "convicted-final",

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
            url: "#",
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

    judicialStatus: "investigated",

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
            url: "#",
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

    judicialStatus: "clean",

    proceedings: [],
  },

  {
    id: "paolo-barbieri",

    firstName: "Paolo",
    lastName: "Barbieri",

    chamber: "senato",

    party: {
      name: "Fratelli d'Italia",
      acronym: "FDI",
    },

    photo: "/politici/paolo-barbieri.jpg",

    legislature: "XIX",
    mandateNumber: 2,
    constituency: "Lombardia",

    birthDate: "1970-02-14",
    birthPlace: "Bergamo",

    judicialStatus: "clean",

    proceedings: [],
  },

  {
    id: "elena-colombo",

    firstName: "Elena",
    lastName: "Colombo",

    chamber: "senato",

    party: {
      name: "Partito Democratico",
      acronym: "PD",
    },

    photo: "/politici/elena-colombo.jpg",

    legislature: "XIX",
    mandateNumber: 1,
    constituency: "Piemonte",

    birthDate: "1976-05-30",
    birthPlace: "Torino",

    judicialStatus: "investigated",

    proceedings: [
      {
        id: "proc-elena-colombo-001",

        title: "Indagine di esempio",

        allegedOffence: "Ipotesi di reato di esempio",

        status: "investigated",

        court: "Procura di esempio",

        startDate: "2025-10-03",
        lastUpdate: "2026-09-01",

        description:
          "Indagine mock utilizzata esclusivamente per simulare un procedimento in fase preliminare.",

        finalJudgment: false,

        timeline: [
          {
            date: "2025-10-03",
            title: "Avvio delle indagini",
          },
          {
            date: "2026-09-01",
            title: "Indagine in corso",
          },
        ],

        sources: [
          {
            name: "Fonte di esempio",
            url: "#",
          },
        ],
      },
    ],
  },

  {
    id: "davide-de-luca",

    firstName: "Davide",
    lastName: "De Luca",

    chamber: "senato",

    party: {
      name: "Movimento 5 Stelle",
      acronym: "M5S",
    },

    photo: "/politici/davide-de-luca.jpg",

    legislature: "XIX",
    mandateNumber: 2,
    constituency: "Campania",

    birthDate: "1973-12-12",
    birthPlace: "Salerno",

    judicialStatus: "archived",

    proceedings: [
      {
        id: "proc-davide-de-luca-001",

        title: "Procedimento archiviato di esempio",

        allegedOffence: "Ipotesi di reato di esempio",

        status: "archived",

        court: "Procura di esempio",

        startDate: "2021-04-09",
        lastUpdate: "2022-06-17",

        description: "Procedimento mock concluso con archiviazione.",

        finalJudgment: false,

        timeline: [
          {
            date: "2021-04-09",
            title: "Apertura del procedimento",
          },
          {
            date: "2022-06-17",
            title: "Archiviazione",
          },
        ],

        sources: [
          {
            name: "Fonte di esempio",
            url: "#",
          },
        ],
      },
    ],
  },

  {
    id: "serena-lombardi",

    firstName: "Serena",
    lastName: "Lombardi",

    chamber: "senato",

    party: {
      name: "Forza Italia",
      acronym: "FI",
    },

    photo: "/politici/serena-lombardi.jpg",

    legislature: "XIX",
    mandateNumber: 3,
    constituency: "Lazio",

    birthDate: "1969-08-22",
    birthPlace: "Roma",

    judicialStatus: "trial",

    proceedings: [
      {
        id: "proc-serena-lombardi-001",

        title: "Procedimento giudiziario di esempio",

        allegedOffence: "Abuso d'ufficio",

        status: "trial",

        court: "Tribunale di esempio",

        startDate: "2023-03-21",
        lastUpdate: "2026-07-15",

        description: "Procedimento mock attualmente in fase processuale.",

        finalJudgment: false,

        timeline: [
          {
            date: "2023-03-21",
            title: "Avvio del procedimento",
          },
          {
            date: "2024-09-10",
            title: "Rinvio a giudizio",
          },
          {
            date: "2026-07-15",
            title: "Processo in corso",
          },
        ],

        sources: [
          {
            name: "Fonte di esempio",
            url: "#",
          },
        ],
      },
    ],
  },

  {
    id: "riccardo-moretti",

    firstName: "Riccardo",
    lastName: "Moretti",

    chamber: "senato",

    party: {
      name: "Lega",
      acronym: "LEGA",
    },

    photo: "/politici/riccardo-moretti.jpg",

    legislature: "XIX",
    mandateNumber: 1,
    constituency: "Veneto",

    birthDate: "1981-04-05",
    birthPlace: "Padova",

    judicialStatus: "clean",

    proceedings: [],
  },

  {
    id: "chiara-villa",

    firstName: "Chiara",
    lastName: "Villa",

    chamber: "senato",

    party: {
      name: "Alleanza Verdi e Sinistra",
      acronym: "AVS",
    },

    photo: "/politici/chiara-villa.jpg",

    legislature: "XIX",
    mandateNumber: 1,
    constituency: "Emilia-Romagna",

    birthDate: "1986-10-17",
    birthPlace: "Modena",

    judicialStatus: "acquitted",

    proceedings: [
      {
        id: "proc-chiara-villa-001",

        title: "Procedimento concluso con assoluzione",

        allegedOffence: "Ipotesi di reato di esempio",

        status: "acquitted",

        court: "Tribunale di esempio",

        startDate: "2021-11-10",
        lastUpdate: "2024-05-16",

        description:
          "Procedimento mock concluso con assoluzione, inserito esclusivamente per testare questo stato nell'interfaccia.",

        finalJudgment: false,

        timeline: [
          {
            date: "2021-11-10",
            title: "Apertura del procedimento",
          },
          {
            date: "2023-01-19",
            title: "Apertura del processo",
          },
          {
            date: "2024-05-16",
            title: "Assoluzione",
          },
        ],

        sources: [
          {
            name: "Fonte di esempio",
            url: "#",
          },
        ],
      },
    ],
  },
];

export default politicians;
