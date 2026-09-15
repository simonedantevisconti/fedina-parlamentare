const GROUPS = {
  FDI: {
    name: "Fratelli d'Italia",
    acronym: "FDI",
  },

  PD: {
    name: "Partito Democratico - Italia Democratica e Progressista",
    acronym: "PD-IDP",
  },

  LEGA: {
    name: "Lega Salvini Premier - Partito Sardo d'Azione",
    acronym: "LSP-PSd'Az",
  },

  M5S: {
    name: "MoVimento 5 Stelle",
    acronym: "M5S",
  },

  FI: {
    name: "Forza Italia - Berlusconi Presidente - PPE",
    acronym: "FI-BP-PPE",
  },

  IV: {
    name: "Italia Viva - Casa Riformista",
    acronym: "IV-CR",
  },

  CIVICI: {
    name: "Civici d'Italia-UDC-Noi Moderati (Noi con l'Italia, Coraggio Italia, Italia al Centro)-MAIE-Centro Popolare",
    acronym: "Cd'I-UDC-NM-MAIE-CP",
  },

  AUT: {
    name: "Per le Autonomie (SVP-PATT, Campobase)",
    acronym: "Aut (SVP-PATT, Cb)",
  },

  MISTO: {
    name: "Misto",
    acronym: "MISTO",
  },
};

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const createSenator = ({
  firstName,
  lastName,
  group,
  senatorType = "elected",
  startDate = null,
}) => {
  const id = slugify(`${firstName}-${lastName}`);

  return {
    id,

    firstName,
    lastName,

    chamber: "senato",

    /*
     * TEMPORANEO:
     * manteniamo "party" per non rompere PoliticianCard,
     * ChamberHemicycle e gli altri componenti.
     *
     * In realtà questi dati rappresentano
     * il GRUPPO PARLAMENTARE.
     */
    party: GROUPS[group],

    photo: `/politici/${id}.jpg`,

    legislature: "XIX",

    mandateNumber: null,

    mandate: {
      startDate,
      endDate: null,
      inOffice: true,
    },

    senatorType,

    constituency: null,

    birthDate: null,
    birthPlace: null,

    institutionalRole: "Senatore",

    institutionalProfileUrl: "",

    institutionalVerification: {
      lastVerifiedAt: "2026-09-16",
      sourceUrl:
        "https://www.senato.it/composizione/senatori/elenco-alfabetico",
    },

    judicialStatus: "not-reviewed",

    judicialVerification: {
      reviewed: false,
      lastVerifiedAt: null,
    },

    proceedings: [],
  };
};

const senators = [
  // ======================================================
  // FRATELLI D'ITALIA
  // ======================================================

  createSenator({
    firstName: "Paola",
    lastName: "Ambrogio",
    group: "FDI",
  }),

  createSenator({
    firstName: "Bartolomeo",
    lastName: "Amidei",
    group: "FDI",
  }),

  createSenator({
    firstName: "Renato",
    lastName: "Ancorotti",
    group: "FDI",
  }),

  createSenator({
    firstName: "Alberto",
    lastName: "Balboni",
    group: "FDI",
  }),

  createSenator({
    firstName: "Michele",
    lastName: "Barcaiuolo",
    group: "FDI",
  }),

  createSenator({
    firstName: "Gianni",
    lastName: "Berrino",
    group: "FDI",
  }),

  createSenator({
    firstName: "Carmela",
    lastName: "Bucalo",
    group: "FDI",
  }),

  createSenator({
    firstName: "Alessio",
    lastName: "Butti",
    group: "FDI",
  }),

  createSenator({
    firstName: "Nicola",
    lastName: "Calandrini",
    group: "FDI",
  }),

  createSenator({
    firstName: "Susanna Donatella",
    lastName: "Campione",
    group: "FDI",
  }),

  createSenator({
    firstName: "Guido",
    lastName: "Castelli",
    group: "FDI",
  }),

  createSenator({
    firstName: "Luca",
    lastName: "Ciriani",
    group: "FDI",
  }),

  createSenator({
    firstName: "Giulia",
    lastName: "Cosenza",
    group: "FDI",
  }),

  createSenator({
    firstName: "Luca",
    lastName: "De Carlo",
    group: "FDI",
  }),

  createSenator({
    firstName: "Andrea",
    lastName: "De Priamo",
    group: "FDI",
  }),

  createSenator({
    firstName: "Costanzo",
    lastName: "Della Porta",
    group: "FDI",
  }),

  createSenator({
    firstName: "Anna Maria",
    lastName: "Fallucchi",
    group: "FDI",
  }),

  createSenator({
    firstName: "Marta",
    lastName: "Farolfi",
    group: "FDI",
  }),

  createSenator({
    firstName: "Giovanbattista",
    lastName: "Fazzolari",
    group: "FDI",
  }),

  createSenator({
    firstName: "Daniela",
    lastName: "Garnero Santanchè",
    group: "FDI",
  }),

  createSenator({
    firstName: "Matteo",
    lastName: "Gelmetti",
    group: "FDI",
  }),

  createSenator({
    firstName: "Antonio",
    lastName: "Iannone",
    group: "FDI",
  }),

  createSenator({
    firstName: "Patrizio Giacomo",
    lastName: "La Pietra",
    group: "FDI",
  }),

  createSenator({
    firstName: "Ignazio",
    lastName: "La Russa",
    group: "FDI",
  }),

  createSenator({
    firstName: "Elena",
    lastName: "Leonardi",
    group: "FDI",
  }),

  createSenator({
    firstName: "Guido Quintino",
    lastName: "Liris",
    group: "FDI",
  }),

  createSenator({
    firstName: "Marco",
    lastName: "Lisei",
    group: "FDI",
  }),

  createSenator({
    firstName: "Gianpietro",
    lastName: "Maffoni",
    group: "FDI",
  }),

  createSenator({
    firstName: "Lucio",
    lastName: "Malan",
    group: "FDI",
  }),

  createSenator({
    firstName: "Paola",
    lastName: "Mancini",
    group: "FDI",
  }),

  createSenator({
    firstName: "Paolo",
    lastName: "Marcheschi",
    group: "FDI",
  }),

  createSenator({
    firstName: "Domenico",
    lastName: "Matera",
    group: "FDI",
  }),

  createSenator({
    firstName: "Filippo",
    lastName: "Melchiorre",
    group: "FDI",
  }),

  createSenator({
    firstName: "Roberto",
    lastName: "Menia",
    group: "FDI",
  }),

  createSenator({
    firstName: "Lavinia",
    lastName: "Mennuni",
    group: "FDI",
  }),

  createSenator({
    firstName: "Ester",
    lastName: "Mieli",
    group: "FDI",
  }),

  createSenator({
    firstName: "Nello",
    lastName: "Musumeci",
    group: "FDI",
  }),

  createSenator({
    firstName: "Gaetano",
    lastName: "Nastri",
    group: "FDI",
  }),

  createSenator({
    firstName: "Vita Maria",
    lastName: "Nocco",
    group: "FDI",
  }),

  createSenator({
    firstName: "Fausto",
    lastName: "Orsomarso",
    group: "FDI",
  }),

  createSenator({
    firstName: "Cinzia",
    lastName: "Pellegrino",
    group: "FDI",
    startDate: "2023-05-09",
  }),

  createSenator({
    firstName: "Marcello",
    lastName: "Pera",
    group: "FDI",
  }),

  createSenator({
    firstName: "Simona",
    lastName: "Petrucci",
    group: "FDI",
  }),

  createSenator({
    firstName: "Salvo",
    lastName: "Pogliese",
    group: "FDI",
  }),

  createSenator({
    firstName: "Ernesto",
    lastName: "Rapani",
    group: "FDI",
  }),

  createSenator({
    firstName: "Sergio",
    lastName: "Rastrelli",
    group: "FDI",
  }),

  createSenator({
    firstName: "Isabella",
    lastName: "Rauti",
    group: "FDI",
  }),

  createSenator({
    firstName: "Gianni",
    lastName: "Rosa",
    group: "FDI",
  }),

  createSenator({
    firstName: "Raoul",
    lastName: "Russo",
    group: "FDI",
  }),

  createSenator({
    firstName: "Salvatore",
    lastName: "Sallemi",
    group: "FDI",
  }),

  createSenator({
    firstName: "Giovanni",
    lastName: "Satta",
    group: "FDI",
  }),

  createSenator({
    firstName: "Marco",
    lastName: "Scurria",
    group: "FDI",
  }),

  createSenator({
    firstName: "Etelwardo",
    lastName: "Sigismondi",
    group: "FDI",
  }),

  createSenator({
    firstName: "Marco",
    lastName: "Silvestroni",
    group: "FDI",
  }),

  createSenator({
    firstName: "Sandro",
    lastName: "Sisler",
    group: "FDI",
  }),

  createSenator({
    firstName: "Raffaele",
    lastName: "Speranzon",
    group: "FDI",
  }),

  createSenator({
    firstName: "Domenica",
    lastName: "Spinelli",
    group: "FDI",
  }),

  createSenator({
    firstName: "Giuliomaria",
    lastName: "Terzi di Sant'Agata",
    group: "FDI",
  }),

  createSenator({
    firstName: "Francesca",
    lastName: "Tubetti",
    group: "FDI",
  }),

  createSenator({
    firstName: "Adolfo",
    lastName: "Urso",
    group: "FDI",
  }),

  createSenator({
    firstName: "Francesco",
    lastName: "Zaffini",
    group: "FDI",
  }),

  createSenator({
    firstName: "Antonella",
    lastName: "Zedda",
    group: "FDI",
  }),

  createSenator({
    firstName: "Ignazio",
    lastName: "Zullo",
    group: "FDI",
  }),

  // ======================================================
  // PARTITO DEMOCRATICO - IDP
  // ======================================================

  createSenator({
    firstName: "Alessandro",
    lastName: "Alfieri",
    group: "PD",
  }),

  createSenator({
    firstName: "Lorenzo",
    lastName: "Basso",
    group: "PD",
  }),

  createSenator({
    firstName: "Alfredo",
    lastName: "Bazoli",
    group: "PD",
  }),

  createSenator({
    firstName: "Francesco",
    lastName: "Boccia",
    group: "PD",
  }),

  createSenator({
    firstName: "Susanna Lina Giulia",
    lastName: "Camusso",
    group: "PD",
  }),

  createSenator({
    firstName: "Pier Ferdinando",
    lastName: "Casini",
    group: "PD",
  }),

  createSenator({
    firstName: "Andrea",
    lastName: "Crisanti",
    group: "PD",
  }),

  createSenator({
    firstName: "Cecilia",
    lastName: "D'Elia",
    group: "PD",
  }),

  createSenator({
    firstName: "Graziano",
    lastName: "Delrio",
    group: "PD",
  }),

  createSenator({
    firstName: "Michele",
    lastName: "Fina",
    group: "PD",
  }),

  createSenator({
    firstName: "Silvio",
    lastName: "Franceschelli",
    group: "PD",
  }),

  createSenator({
    firstName: "Dario",
    lastName: "Franceschini",
    group: "PD",
  }),

  createSenator({
    firstName: "Francesco",
    lastName: "Giacobbe",
    group: "PD",
  }),

  createSenator({
    firstName: "Andrea",
    lastName: "Giorgis",
    group: "PD",
  }),

  createSenator({
    firstName: "Nicola",
    lastName: "Irto",
    group: "PD",
  }),

  createSenator({
    firstName: "Francesca",
    lastName: "La Marca",
    group: "PD",
  }),

  createSenator({
    firstName: "Beatrice",
    lastName: "Lorenzin",
    group: "PD",
  }),

  createSenator({
    firstName: "Alberto",
    lastName: "Losacco",
    group: "PD",
  }),

  createSenator({
    firstName: "Simona Flavia",
    lastName: "Malpezzi",
    group: "PD",
  }),

  createSenator({
    firstName: "Daniele",
    lastName: "Manca",
    group: "PD",
  }),

  createSenator({
    firstName: "Andrea",
    lastName: "Martella",
    group: "PD",
  }),

  createSenator({
    firstName: "Marco",
    lastName: "Meloni",
    group: "PD",
  }),

  createSenator({
    firstName: "Franco",
    lastName: "Mirabelli",
    group: "PD",
  }),

  createSenator({
    firstName: "Antonio",
    lastName: "Misiani",
    group: "PD",
  }),

  createSenator({
    firstName: "Antonio",
    lastName: "Nicita",
    group: "PD",
  }),

  createSenator({
    firstName: "Dario",
    lastName: "Parrini",
    group: "PD",
  }),

  createSenator({
    firstName: "Vincenza",
    lastName: "Rando",
    group: "PD",
  }),

  createSenator({
    firstName: "Tatjana",
    lastName: "Rojc",
    group: "PD",
  }),

  createSenator({
    firstName: "Anna",
    lastName: "Rossomando",
    group: "PD",
  }),

  createSenator({
    firstName: "Filippo",
    lastName: "Sensi",
    group: "PD",
    startDate: "2023-03-21",
  }),

  createSenator({
    firstName: "Cristina",
    lastName: "Tajani",
    group: "PD",
    startDate: "2023-05-31",
  }),

  createSenator({
    firstName: "Valeria",
    lastName: "Valente",
    group: "PD",
  }),

  createSenator({
    firstName: "Francesco",
    lastName: "Verducci",
    group: "PD",
  }),

  createSenator({
    firstName: "Walter",
    lastName: "Verini",
    group: "PD",
  }),

  createSenator({
    firstName: "Ylenia",
    lastName: "Zambito",
    group: "PD",
  }),

  createSenator({
    firstName: "Sandra",
    lastName: "Zampa",
    group: "PD",
  }),

  // ======================================================
  // LEGA
  // ======================================================

  createSenator({
    firstName: "Giorgio Maria",
    lastName: "Bergesio",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Mara",
    lastName: "Bizzotto",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Giulia",
    lastName: "Bongiorno",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Stefano",
    lastName: "Borghesi",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Claudio",
    lastName: "Borghi",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Lucia",
    lastName: "Borgonzoni",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Roberto",
    lastName: "Calderoli",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Gianluca",
    lastName: "Cantalamessa",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Maria Cristina",
    lastName: "Cantù",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Gian Marco",
    lastName: "Centinaio",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Marco",
    lastName: "Dreosto",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Claudio",
    lastName: "Durigon",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Massimo",
    lastName: "Garavaglia",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Antonino",
    lastName: "Germanà",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Roberto",
    lastName: "Marti",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Tilde",
    lastName: "Minasi",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Alessandro",
    lastName: "Morelli",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Elena",
    lastName: "Murelli",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Andrea",
    lastName: "Ostellari",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Andrea",
    lastName: "Paganella",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Daisy",
    lastName: "Pirovano",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Manfredi",
    lastName: "Potenti",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Stefania",
    lastName: "Pucciarelli",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Massimiliano",
    lastName: "Romeo",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Matteo",
    lastName: "Salvini",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Nicoletta",
    lastName: "Spelgatti",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Erika",
    lastName: "Stefani",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Elena",
    lastName: "Testor",
    group: "LEGA",
  }),

  createSenator({
    firstName: "Paolo",
    lastName: "Tosato",
    group: "LEGA",
  }),

  // ======================================================
  // MOVIMENTO 5 STELLE
  // ======================================================

  createSenator({
    firstName: "Vincenza",
    lastName: "Aloisio",
    group: "M5S",
  }),

  createSenator({
    firstName: "Dolores",
    lastName: "Bevilacqua",
    group: "M5S",
  }),

  createSenator({
    firstName: "Anna",
    lastName: "Bilotti",
    group: "M5S",
  }),

  createSenator({
    firstName: "Maria Domenica",
    lastName: "Castellone",
    group: "M5S",
  }),

  createSenator({
    firstName: "Roberto",
    lastName: "Cataldi",
    group: "M5S",
  }),

  createSenator({
    firstName: "Marco",
    lastName: "Croatti",
    group: "M5S",
  }),

  createSenator({
    firstName: "Concetta",
    lastName: "Damante",
    group: "M5S",
  }),

  createSenator({
    firstName: "Gabriella",
    lastName: "Di Girolamo",
    group: "M5S",
  }),

  createSenator({
    firstName: "Barbara",
    lastName: "Floridia",
    group: "M5S",
  }),

  createSenator({
    firstName: "Felicia",
    lastName: "Gaudiano",
    group: "M5S",
    startDate: "2025-01-08",
  }),

  createSenator({
    firstName: "Barbara",
    lastName: "Guidolin",
    group: "M5S",
  }),

  createSenator({
    firstName: "Ettore Antonio",
    lastName: "Licheri",
    group: "M5S",
  }),

  createSenator({
    firstName: "Sabrina",
    lastName: "Licheri",
    group: "M5S",
  }),

  createSenator({
    firstName: "Ada",
    lastName: "Lopreiato",
    group: "M5S",
  }),

  createSenator({
    firstName: "Pietro",
    lastName: "Lorefice",
    group: "M5S",
  }),

  createSenator({
    firstName: "Alessandra",
    lastName: "Maiorino",
    group: "M5S",
  }),

  createSenator({
    firstName: "Bruno",
    lastName: "Marton",
    group: "M5S",
  }),

  createSenator({
    firstName: "Orfeo",
    lastName: "Mazzella",
    group: "M5S",
  }),

  createSenator({
    firstName: "Gisella",
    lastName: "Naturale",
    group: "M5S",
  }),

  createSenator({
    firstName: "Luigi",
    lastName: "Nave",
    group: "M5S",
  }),

  createSenator({
    firstName: "Stefano",
    lastName: "Patuanelli",
    group: "M5S",
  }),

  createSenator({
    firstName: "Luca",
    lastName: "Pirondini",
    group: "M5S",
  }),

  createSenator({
    firstName: "Elisa",
    lastName: "Pirro",
    group: "M5S",
  }),

  createSenator({
    firstName: "Roberto Maria Ferdinando",
    lastName: "Scarpinato",
    group: "M5S",
  }),

  createSenator({
    firstName: "Elena",
    lastName: "Sironi",
    group: "M5S",
  }),

  createSenator({
    firstName: "Mario",
    lastName: "Turco",
    group: "M5S",
  }),

  // ======================================================
  // FORZA ITALIA
  // ======================================================

  createSenator({
    firstName: "Maria Elisabetta",
    lastName: "Alberti Casellati",
    group: "FI",
  }),

  createSenator({
    firstName: "Alberto",
    lastName: "Barachini",
    group: "FI",
  }),

  createSenator({
    firstName: "Anna Maria",
    lastName: "Bernini",
    group: "FI",
  }),

  createSenator({
    firstName: "Stefania Gabriella Anastasia",
    lastName: "Craxi",
    group: "FI",
  }),

  createSenator({
    firstName: "Dario",
    lastName: "Damiani",
    group: "FI",
  }),

  createSenator({
    firstName: "Raffaele",
    lastName: "De Rosa",
    group: "FI",
  }),

  createSenator({
    firstName: "Claudio",
    lastName: "Fazzone",
    group: "FI",
  }),

  createSenator({
    firstName: "Adriano",
    lastName: "Galliani",
    group: "FI",
    startDate: "2023-10-30",
  }),

  createSenator({
    firstName: "Maurizio",
    lastName: "Gasparri",
    group: "FI",
  }),

  createSenator({
    firstName: "Claudio",
    lastName: "Lotito",
    group: "FI",
  }),

  createSenator({
    firstName: "Mario",
    lastName: "Occhiuto",
    group: "FI",
  }),

  createSenator({
    firstName: "Adriano",
    lastName: "Paroli",
    group: "FI",
  }),

  createSenator({
    firstName: "Licia",
    lastName: "Ronzulli",
    group: "FI",
  }),

  createSenator({
    firstName: "Roberto",
    lastName: "Rosso",
    group: "FI",
  }),

  createSenator({
    firstName: "Francesco",
    lastName: "Silvestro",
    group: "FI",
  }),

  createSenator({
    firstName: "Francesco Paolo",
    lastName: "Sisto",
    group: "FI",
  }),

  createSenator({
    firstName: "Daniela",
    lastName: "Ternullo",
    group: "FI",
    startDate: "2023-01-18",
  }),

  createSenator({
    firstName: "Antonio Salvatore",
    lastName: "Trevisi",
    group: "FI",
  }),

  createSenator({
    firstName: "Pierantonio",
    lastName: "Zanettin",
    group: "FI",
  }),

  createSenator({
    firstName: "Paolo",
    lastName: "Zangrillo",
    group: "FI",
  }),

  // ======================================================
  // ITALIA VIVA - CASA RIFORMISTA
  // ======================================================

  createSenator({
    firstName: "Enrico",
    lastName: "Borghi",
    group: "IV",
  }),

  createSenator({
    firstName: "Silvia",
    lastName: "Fregolent",
    group: "IV",
  }),

  createSenator({
    firstName: "Annamaria",
    lastName: "Furlan",
    group: "IV",
  }),

  createSenator({
    firstName: "Dafne",
    lastName: "Musolino",
    group: "IV",
  }),

  createSenator({
    firstName: "Raffaella",
    lastName: "Paita",
    group: "IV",
  }),

  createSenator({
    firstName: "Matteo",
    lastName: "Renzi",
    group: "IV",
  }),

  createSenator({
    firstName: "Daniela",
    lastName: "Sbrollini",
    group: "IV",
  }),

  createSenator({
    firstName: "Ivan",
    lastName: "Scalfarotto",
    group: "IV",
  }),

  // ======================================================
  // CIVICI / NOI MODERATI / UDC / MAIE
  // ======================================================

  createSenator({
    firstName: "Michaela",
    lastName: "Biancofiore",
    group: "CIVICI",
  }),

  createSenator({
    firstName: "Mario Alejandro",
    lastName: "Borghese",
    group: "CIVICI",
  }),

  createSenator({
    firstName: "Antonio",
    lastName: "De Poli",
    group: "CIVICI",
  }),

  createSenator({
    firstName: "Mariastella",
    lastName: "Gelmini",
    group: "CIVICI",
  }),

  createSenator({
    firstName: "Antonio",
    lastName: "Guidi",
    group: "CIVICI",
  }),

  createSenator({
    firstName: "Giovanna",
    lastName: "Petrenga",
    group: "CIVICI",
  }),

  createSenator({
    firstName: "Giorgio",
    lastName: "Salvitti",
    group: "CIVICI",
  }),

  createSenator({
    firstName: "Giusy",
    lastName: "Versace",
    group: "CIVICI",
  }),

  // ======================================================
  // PER LE AUTONOMIE
  // ======================================================

  createSenator({
    firstName: "Elena",
    lastName: "Cattaneo",
    group: "AUT",
    senatorType: "life",
  }),

  createSenator({
    firstName: "Meinhard",
    lastName: "Durnwalder",
    group: "AUT",
  }),

  createSenator({
    firstName: "Aurora",
    lastName: "Floridia",
    group: "AUT",
  }),

  createSenator({
    firstName: "Pietro",
    lastName: "Patton",
    group: "AUT",
  }),

  createSenator({
    firstName: "Carlo",
    lastName: "Rubbia",
    group: "AUT",
    senatorType: "life",
  }),

  createSenator({
    firstName: "Luigi",
    lastName: "Spagnolli",
    group: "AUT",
  }),

  createSenator({
    firstName: "Julia",
    lastName: "Unterberger",
    group: "AUT",
  }),

  // ======================================================
  // GRUPPO MISTO
  // ======================================================

  createSenator({
    firstName: "Carlo",
    lastName: "Calenda",
    group: "MISTO",
  }),

  createSenator({
    firstName: "Ilaria",
    lastName: "Cucchi",
    group: "MISTO",
  }),

  createSenator({
    firstName: "Peppe",
    lastName: "De Cristofaro",
    group: "MISTO",
  }),

  createSenator({
    firstName: "Marco",
    lastName: "Lombardo",
    group: "MISTO",
  }),

  createSenator({
    firstName: "Tino",
    lastName: "Magni",
    group: "MISTO",
  }),

  createSenator({
    firstName: "Mario",
    lastName: "Monti",
    group: "MISTO",
    senatorType: "life",
  }),

  createSenator({
    firstName: "Renzo",
    lastName: "Piano",
    group: "MISTO",
    senatorType: "life",
  }),

  createSenator({
    firstName: "Liliana",
    lastName: "Segre",
    group: "MISTO",
    senatorType: "life",
  }),
];

export default senators;
