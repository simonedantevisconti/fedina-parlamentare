import { createPolitician } from "./createPolitician.js";

const createSenator = (values) => createPolitician({ ...values, chamber: "senato" });

const SENATOR_OVERRIDES = {
  "Cinzia|Pellegrino": {
    startDate: "2023-05-09",
  },

  "Filippo|Sensi": {
    startDate: "2023-03-21",
  },

  "Cristina|Tajani": {
    startDate: "2023-05-31",
  },

  "Felicia|Gaudiano": {
    startDate: "2025-01-08",
  },

  "Adriano|Galliani": {
    startDate: "2023-10-30",
  },

  "Daniela|Ternullo": {
    startDate: "2023-01-18",
  },

  "Elena|Cattaneo": {
    senatorType: "life",
  },

  "Carlo|Rubbia": {
    senatorType: "life",
  },

  "Mario|Monti": {
    senatorType: "life",
  },

  "Renzo|Piano": {
    senatorType: "life",
  },

  "Liliana|Segre": {
    senatorType: "life",
  },
};

const SENATORS_BY_PARTY = {
  // ======================================================
  // FRATELLI D'ITALIA
  // ======================================================

  FDI: [
    "Paola|Ambrogio",
    "Bartolomeo|Amidei",
    "Renato|Ancorotti",
    "Alberto|Balboni",
    "Michele|Barcaiuolo",
    "Gianni|Berrino",
    "Carmela|Bucalo",
    "Alessio|Butti",
    "Nicola|Calandrini",
    "Susanna Donatella|Campione",
    "Guido|Castelli",
    "Luca|Ciriani",
    "Giulia|Cosenza",
    "Luca|De Carlo",
    "Andrea|De Priamo",
    "Costanzo|Della Porta",
    "Anna Maria|Fallucchi",
    "Marta|Farolfi",
    "Giovanbattista|Fazzolari",
    "Daniela|Garnero Santanchè",
    "Matteo|Gelmetti",
    "Antonio|Iannone",
    "Patrizio Giacomo|La Pietra",
    "Ignazio|La Russa",
    "Elena|Leonardi",
    "Guido Quintino|Liris",
    "Marco|Lisei",
    "Gianpietro|Maffoni",
    "Lucio|Malan",
    "Paola|Mancini",
    "Paolo|Marcheschi",
    "Domenico|Matera",
    "Filippo|Melchiorre",
    "Roberto|Menia",
    "Lavinia|Mennuni",
    "Ester|Mieli",
    "Nello|Musumeci",
    "Gaetano|Nastri",
    "Vita Maria|Nocco",
    "Fausto|Orsomarso",
    "Cinzia|Pellegrino",
    "Marcello|Pera",
    "Simona|Petrucci",
    "Salvo|Pogliese",
    "Ernesto|Rapani",
    "Sergio|Rastrelli",
    "Isabella|Rauti",
    "Gianni|Rosa",
    "Raoul|Russo",
    "Salvatore|Sallemi",
    "Giovanni|Satta",
    "Marco|Scurria",
    "Etelwardo|Sigismondi",
    "Marco|Silvestroni",
    "Sandro|Sisler",
    "Raffaele|Speranzon",
    "Domenica|Spinelli",
    "Giuliomaria|Terzi di Sant'Agata",
    "Francesca|Tubetti",
    "Adolfo|Urso",
    "Francesco|Zaffini",
    "Antonella|Zedda",
    "Ignazio|Zullo",
  ],

  // ======================================================
  // PARTITO DEMOCRATICO
  // ======================================================

  PD: [
    "Alessandro|Alfieri",
    "Lorenzo|Basso",
    "Alfredo|Bazoli",
    "Francesco|Boccia",
    "Susanna Lina Giulia|Camusso",
    "Pier Ferdinando|Casini",
    "Andrea|Crisanti",
    "Cecilia|D'Elia",
    "Graziano|Delrio",
    "Michele|Fina",
    "Silvio|Franceschelli",
    "Dario|Franceschini",
    "Francesco|Giacobbe",
    "Andrea|Giorgis",
    "Nicola|Irto",
    "Francesca|La Marca",
    "Beatrice|Lorenzin",
    "Alberto|Losacco",
    "Simona Flavia|Malpezzi",
    "Daniele|Manca",
    "Andrea|Martella",
    "Marco|Meloni",
    "Franco|Mirabelli",
    "Antonio|Misiani",
    "Antonio|Nicita",
    "Dario|Parrini",
    "Vincenza|Rando",
    "Tatjana|Rojc",
    "Anna|Rossomando",
    "Filippo|Sensi",
    "Cristina|Tajani",
    "Valeria|Valente",
    "Francesco|Verducci",
    "Walter|Verini",
    "Ylenia|Zambito",
    "Sandra|Zampa",
  ],

  // ======================================================
  // LEGA
  // ======================================================

  LEGA: [
    "Giorgio Maria|Bergesio",
    "Mara|Bizzotto",
    "Giulia|Bongiorno",
    "Stefano|Borghesi",
    "Claudio|Borghi",
    "Lucia|Borgonzoni",
    "Roberto|Calderoli",
    "Gianluca|Cantalamessa",
    "Maria Cristina|Cantù",
    "Gian Marco|Centinaio",
    "Marco|Dreosto",
    "Claudio|Durigon",
    "Massimo|Garavaglia",
    "Antonino|Germanà",
    "Roberto|Marti",
    "Tilde|Minasi",
    "Alessandro|Morelli",
    "Elena|Murelli",
    "Andrea|Ostellari",
    "Andrea|Paganella",
    "Daisy|Pirovano",
    "Manfredi|Potenti",
    "Stefania|Pucciarelli",
    "Massimiliano|Romeo",
    "Matteo|Salvini",
    "Nicoletta|Spelgatti",
    "Erika|Stefani",
    "Elena|Testor",
    "Paolo|Tosato",
  ],

  // ======================================================
  // FORZA ITALIA
  // ======================================================

  FI: [
    "Maria Elisabetta|Alberti Casellati",
    "Alberto|Barachini",
    "Anna Maria|Bernini",
    "Stefania Gabriella Anastasia|Craxi",
    "Dario|Damiani",
    "Raffaele|De Rosa",
    "Claudio|Fazzone",
    "Adriano|Galliani",
    "Maurizio|Gasparri",
    "Claudio|Lotito",
    "Mario|Occhiuto",
    "Adriano|Paroli",
    "Licia|Ronzulli",
    "Roberto|Rosso",
    "Francesco|Silvestro",
    "Francesco Paolo|Sisto",
    "Daniela|Ternullo",
    "Antonio Salvatore|Trevisi",
    "Pierantonio|Zanettin",
    "Paolo|Zangrillo",
  ],

  // ======================================================
  // MOVIMENTO 5 STELLE
  // ======================================================

  M5S: [
    "Vincenza|Aloisio",
    "Dolores|Bevilacqua",
    "Anna|Bilotti",
    "Maria Domenica|Castellone",
    "Roberto|Cataldi",
    "Marco|Croatti",
    "Concetta|Damante",
    "Gabriella|Di Girolamo",
    "Barbara|Floridia",
    "Felicia|Gaudiano",
    "Barbara|Guidolin",
    "Ettore Antonio|Licheri",
    "Sabrina|Licheri",
    "Ada|Lopreiato",
    "Pietro|Lorefice",
    "Alessandra|Maiorino",
    "Bruno|Marton",
    "Orfeo|Mazzella",
    "Gisella|Naturale",
    "Luigi|Nave",
    "Stefano|Patuanelli",
    "Luca|Pirondini",
    "Elisa|Pirro",
    "Roberto Maria Ferdinando|Scarpinato",
    "Elena|Sironi",
    "Mario|Turco",
  ],

  // ======================================================
  // AZIONE
  // ======================================================
  //
  // Nessun blocco proveniente dalla precedente
  // classificazione del Senato viene forzato qui.
  //

  AZ: [],

  // ======================================================
  // ALLEANZA VERDI E SINISTRA
  // ======================================================
  //
  // Nessun blocco proveniente dalla precedente
  // classificazione del Senato viene forzato qui.
  //

  AVS: [],

  // ======================================================
  // NOI MODERATI
  //
  // Ex gruppo CIVICI normalizzato come NM
  // ======================================================

  NM: [
    "Michaela|Biancofiore",
    "Mario Alejandro|Borghese",
    "Antonio|De Poli",
    "Mariastella|Gelmini",
    "Antonio|Guidi",
    "Giovanna|Petrenga",
    "Giorgio|Salvitti",
    "Giusy|Versace",
  ],

  // ======================================================
  // ITALIA VIVA
  // ======================================================

  IV: [
    "Enrico|Borghi",
    "Silvia|Fregolent",
    "Annamaria|Furlan",
    "Dafne|Musolino",
    "Raffaella|Paita",
    "Matteo|Renzi",
    "Daniela|Sbrollini",
    "Ivan|Scalfarotto",
  ],

  // ======================================================
  // MISTO
  //
  // Qui confluiscono:
  // - ex gruppo Per le Autonomie
  // - ex Gruppo Misto
  //
  // Questo è un accorpamento interno all'app.
  // ======================================================

  MISTO: [
    "Elena|Cattaneo",
    "Meinhard|Durnwalder",
    "Aurora|Floridia",
    "Pietro|Patton",
    "Carlo|Rubbia",
    "Luigi|Spagnolli",
    "Julia|Unterberger",

    "Carlo|Calenda",
    "Ilaria|Cucchi",
    "Peppe|De Cristofaro",
    "Marco|Lombardo",
    "Tino|Magni",
    "Mario|Monti",
    "Renzo|Piano",
    "Liliana|Segre",
  ],
};

const senators = Object.entries(SENATORS_BY_PARTY)
  .flatMap(([party, members]) =>
    members.map((member) => {
      const [firstName, lastName] = member.split("|");

      const override = SENATOR_OVERRIDES[member] ?? {};

      return createSenator({
        firstName,
        lastName,
        party,

        senatorType: override.senatorType ?? "elected",

        startDate: override.startDate ?? null,
      });
    }),
  )
  .sort((a, b) =>
    a.lastName.localeCompare(b.lastName, "it", {
      sensitivity: "base",
    }),
  );

export default senators;
