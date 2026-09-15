/**
 * Fedina Parlamentare — Deputati della XIX Legislatura
 *
 * Elenco dei deputati attualmente in carica verificato
 * il 16 settembre 2026.
 *
 * Fonte istituzionale:
 * Camera dei deputati.
 *
 * IMPORTANTE:
 * - `party` è mantenuto temporaneamente per compatibilità
 *   con i componenti già esistenti;
 * - in realtà rappresenta il GRUPPO PARLAMENTARE corrente;
 * - `parliamentaryGroup` contiene lo stesso dato
 *   con il nome semanticamente corretto;
 * - nessuna verifica giudiziaria è stata ancora effettuata;
 * - tutti partono da `judicialStatus: "not-reviewed"`.
 */

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
    name: "Lega - Salvini Premier",
    acronym: "LEGA",
  },

  FI: {
    name: "Forza Italia - Berlusconi Presidente - PPE",
    acronym: "FI-PPE",
  },

  M5S: {
    name: "MoVimento 5 Stelle",
    acronym: "M5S",
  },

  AZIONE: {
    name: "Azione-Popolari europeisti riformatori-Renew Europe",
    acronym: "AZ-PER-RE",
  },

  AVS: {
    name: "Alleanza Verdi e Sinistra",
    acronym: "AVS",
  },

  NM: {
    name: "NOI MODERATI (NOI CON L'ITALIA, CORAGGIO ITALIA, UDC E ITALIA AL CENTRO)-MAIE-CENTRO POPOLARE",
    acronym: "NM(N-C-U-I)M-CP",
  },

  IV: {
    name: "Italia Viva-Casa Riformista",
    acronym: "IV-CR",
  },

  FNV: {
    name: "MISTO-Futuro Nazionale Vannacci - Free",
    acronym: "MISTO-FNV-F",
  },

  MINLING: {
    name: "MISTO-Minoranze Linguistiche",
    acronym: "MISTO-MIN.LING.",
  },

  EUROPA: {
    name: "MISTO-+Europa - Stati Uniti d'Europa",
    acronym: "MISTO-+EUROPA-SUE",
  },

  MISTO: {
    name: "MISTO",
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

const createDeputy = ({ firstName, lastName, group }) => {
  const id = slugify(`${firstName}-${lastName}`);

  const parliamentaryGroup = GROUPS[group];

  return {
    id,

    firstName,
    lastName,

    chamber: "camera",

    /*
     * Alias temporaneo.
     * Verrà eliminato quando aggiorneremo
     * i componenti per usare direttamente
     * parliamentaryGroup.
     */
    party: parliamentaryGroup,

    parliamentaryGroup,

    photo: `/politici/${id}.jpg`,

    legislature: "XIX",

    mandateNumber: null,

    mandate: {
      startDate: null,
      endDate: null,
      inOffice: true,
    },

    constituency: null,

    birthDate: null,
    birthPlace: null,

    institutionalRole: "Deputato",

    institutionalProfileUrl: "",

    institutionalVerification: {
      lastVerifiedAt: "2026-09-16",

      sourceUrl: "https://www.camera.it/deputati/elenco",

      sourceDocumentUrl: "https://www.camera.it/leg19/368",
    },

    judicialStatus: "not-reviewed",

    judicialVerification: {
      reviewed: false,
      lastVerifiedAt: null,
    },

    proceedings: [],
  };
};

const DEPUTIES_BY_GROUP = {
  FDI: [
    "Lucia|Albano",
    "Cristina|Almici",
    "Alessia|Ambrosi",
    "Enzo|Amich",
    "Alessandro|Amorese",
    "Alfredo|Antoniozzi",
    "Antonio|Baldelli",
    "Maria Teresa|Bellucci",
    "Stefano Maria|Benvenuti Gostoli",
    "Galeazzo|Bignami",
    "Alice|Buonguerrieri",
    "Salvatore|Caiata",
    "Giangiacomo|Calovini",
    "Gerolamo|Cangiano",
    "Giovanni Luca|Cannata",
    "Gianluca|Caramanna",
    "Maria Cristina|Caretta",
    "Marco|Cerreto",
    "Paola Maria|Chiesa",
    "Monica|Ciaburro",
    "Francesco Maria Salvatore|Ciancitto",
    "Luciano|Ciocchetti",
    "Edmondo|Cirielli",
    "Beatriz|Colombo",
    "Chiara|Colosimo",
    "Fabrizio|Comba",
    "Saverio|Congedo",
    "Marcello|Coppo",
    "Riccardo|De Corato",
    "Salvatore|Deidda",
    "Andrea|Delmastro Delle Vedove",
    "Andrea|Di Giuseppe",
    "Grazia|Di Maggio",
    "Daniela|Dondi",
    "Giovanni|Donzelli",
    "Wanda|Ferro",
    "Francesco|Filini",
    "Tommaso|Foti",
    "Paola|Frassinetti",
    "Maria Grazia|Frijia",
    "Antonio Maria|Gabellone",
    "Elisabetta|Gardini",
    "Marcello|Gemmato",
    "Antonio|Giordano",
    "Carmen Letizia|Giorgianni",
    "Silvio|Giovine",
    "Irene|Gori",
    "Naike|Gruppioni",
    "Dario|Iaia",
    "Sara|Kelany",
    "Giandonato|La Salandra",
    "Gianni|Lampis",
    "Elisabetta Christiana|Lancellotta",
    "Maurizio|Leo",
    "Francesco|Lollobrigida",
    "Eliana|Longi",
    "Emanuele|Loperfido",
    "Ylenja|Lucaselli",
    "Carlo|Maccari",
    "Novo Umberto|Maerna",
    "Giovanni|Maiorano",
    "Lorenzo|Malagola",
    "Mauro|Malaguti",
    "Lucrezia Maria Benedetta|Mantovani",
    "Marina|Marchetto Aliprandi",
    "Andrea|Mascaretti",
    "Ciro|Maschio",
    "Mariangela|Matera",
    "Nicole|Matteoni",
    "Aldo|Mattia",
    "Stefano Giovanni|Maullu",
    "Gianmarco|Mazzi",
    "Giorgia|Meloni",
    "Francesco|Michelotti",
    "Massimo|Milani",
    "Federico|Mollicone",
    "Augusta|Montaruli",
    "Maddalena|Morgante",
    "Francesco|Mura",
    "Carlo|Nordio",
    "Marco|Osnato",
    "Marco|Padovani",
    "Alessandro|Palombi",
    "Andrea|Pellicini",
    "Marco|Perissa",
    "Fabio|Pietrella",
    "Calogero|Pisano",
    "Barbara|Polo",
    "Emanuele|Prisco",
    "Paolo|Pulciani",
    "Carmine Fabio|Raimondo",
    "Fabio|Rampelli",
    "Walter|Rizzetto",
    "Eugenia|Roccella",
    "Fabio|Roscani",
    "Angelo|Rossi",
    "Fabrizio|Rossi",
    "Matteo|Rosso",
    "Mauro|Rotelli",
    "Gianfranco|Rotondi",
    "Massimo|Ruspandini",
    "Gaetana|Russo",
    "Luca|Sbardella",
    "Michele|Schiano Di Visconti",
    "Marta|Schifone",
    "Rachele|Silvestri",
    "Guerino|Testa",
    "Paolo|Trancassini",
    "Roberto|Traversi",
    "Andrea|Tremaglia",
    "Giulio|Tremonti",
    "Alessandro|Urzì",
    "Maria Carolina|Varchi",
    "Imma|Vietri",
    "Gianluca|Vinci",
    "Andrea|Volpi",
    "Riccardo|Zucconi",
    "Immacolata|Zurzolo",
  ],

  PD: [
    "Vincenzo|Amendola",
    "Anna|Ascani",
    "Ouidad|Bakkali",
    "Anthony Emanuele|Barbagallo",
    "Mauro|Berruto",
    "Laura|Boldrini",
    "Simona|Bonafè",
    "Chiara|Braga",
    "Nicola|Carè",
    "Andrea|Casu",
    "Paolo|Ciani",
    "Gianni|Cuperlo",
    "Augusto|Curti",
    "Luciano|D'Alfonso",
    "Piero|De Luca",
    "Andrea|De Maria",
    "Paola|De Micheli",
    "Michela|Di Biase",
    "Christian Diego|Di Sanzo",
    "Eleonora|Evi",
    "Piero|Fassino",
    "Sara|Ferrari",
    "Rosanna|Filippin",
    "Antonella|Forattini",
    "Federico|Fornaro",
    "Emiliano|Fossi",
    "Marco|Furfaro",
    "Valentina|Ghio",
    "Federico|Gianassi",
    "Gian Antonio|Girelli",
    "Andrea|Gnassi",
    "Stefano|Graziano",
    "Chiara|Gribaudo",
    "Lorenzo|Guerini",
    "Maria Cecilia|Guerra",
    "Giovanna|Iacono",
    "Marco|Lacarra",
    "Silvio|Lai",
    "Mauro Antonio Donato|Laus",
    "Ilenia|Malavasi",
    "Claudio|Mancini",
    "Irene|Manzi",
    "Maria Stefania|Marino",
    "Matteo|Mauri",
    "Virginio|Merola",
    "Roberto|Morassut",
    "Matteo|Orfini",
    "Alberto|Pandolfo",
    "Vinicio Giuseppe Guido|Peluffo",
    "Fabio|Porta",
    "Patrizia|Prestipino",
    "Giuseppe|Provenzano",
    "Lia|Quartapelle Procopio",
    "Toni|Ricciardi",
    "Silvia|Roggiani",
    "Nadia|Romeo",
    "Andrea|Rossi",
    "Marco|Sarracino",
    "Rachele|Scarpa",
    "Elly|Schlein",
    "Arturo|Scotto",
    "Debora|Serracchiani",
    "Marco|Simiani",
    "Roberto|Speranza",
    "Claudio Michele|Stefanazzi",
    "Nicola|Stumpo",
    "Stefano|Vaccari",
    "Francesca|Viggiano",
  ],

  LEGA: [
    "Giorgia|Andreuzza",
    "Antonio|Angelucci",
    "Andrea|Barabotti",
    "Alessandro Manuel|Benvenuto",
    "Simone|Billi",
    "Ingrid|Bisa",
    "Simona|Bordonali",
    "Francesco|Bruzzone",
    "Stefano|Candiani",
    "Virginio|Caparvi",
    "Mirco|Carloni",
    "Anastasio|Carrà",
    "Vanessa|Cattoi",
    "Laura|Cavandoli",
    "Fabrizio|Cecchetti",
    "Giulio|Centemero",
    "Giulio|Centenaro",
    "Dimitri|Coin",
    "Silvana Andreina|Comaroli",
    "Andrea|Crippa",
    "Andrea|Dara",
    "Andrea|De Bertoldi",
    "Salvatore Marcello|Di Mattina",
    "Alberto|Di Rubba",
    "Lorenzo|Fontana",
    "Paolo|Formentini",
    "Rebecca|Frassini",
    "Federico|Freni",
    "Vannia|Gava",
    "Andrea|Giaccone",
    "Dario|Giagoni",
    "Alessandro|Giglio Vigna",
    "Giancarlo|Giorgetti",
    "Alberto Luigi|Gusmeroli",
    "Igor|Iezzi",
    "Giorgia|Latini",
    "Arianna|Lazzarini",
    "Simona|Loizzo",
    "Elena|Maccanti",
    "Manuela|Maffioli",
    "Riccardo Augusto|Marchetti",
    "Simonetta|Matone",
    "Giovanna|Miele",
    "Riccardo|Molinari",
    "Nicola|Molteni",
    "Elisa|Montemagni",
    "Jacopo|Morrone",
    "Tiziana|Nisini",
    "Nicola|Ottaviani",
    "Massimiliano|Panizzut",
    "Graziano|Pizzimenti",
    "Edoardo|Rixi",
    "Valeria|Sudano",
    "Luca|Toccalini",
    "Gianpiero|Zinzi",
    "Eugenio|Zoffili",
  ],

  FI: [
    "Giovanni|Arruzzolo",
    "Roberto|Bagnasco",
    "Paolo|Barelli",
    "Alessandro|Battilocchio",
    "Francesco|Battistoni",
    "Davide|Bellomo",
    "Stefano|Benigni",
    "Deborah|Bergamini",
    "Pino|Bicchielli",
    "Maria Paola|Boscaini",
    "Tommaso Antonino|Calderone",
    "Ugo|Cappellacci",
    "Andrea|Caroppo",
    "Maurizio|Casasco",
    "Giuseppe|Castiglione",
    "Alessandro|Cattaneo",
    "Piergiorgio|Cortelazzo",
    "Enrico|Costa",
    "Mauro|D'Attis",
    "Rita|Dalla Chiesa",
    "Isabella|De Monte",
    "Vito|De Palma",
    "Marta Antonia|Fascina",
    "Tullio|Ferrante",
    "Giandiego|Gatta",
    "Andrea|Gentile",
    "Giorgio|Lovecchio",
    "Giuseppe Tommaso Vincenzo|Mangialavori",
    "Patrizia|Marrocco",
    "Erica|Mazzetti",
    "Antonino|Minardo",
    "Giorgio|Mulè",
    "Raffaele|Nevi",
    "Andrea|Orsini",
    "Nazario|Pagano",
    "Annarita|Patriarca",
    "Roberto|Pella",
    "Gilberto|Pichetto Fratin",
    "Pietro|Pittalis",
    "Catia|Polidori",
    "Erik Umberto|Pretto",
    "Cristina|Rossello",
    "Francesco Maria|Rubano",
    "Paolo Emilio|Russo",
    "Gloria|Saccani Jotti",
    "Fabrizio|Sala",
    "Matilde|Siracusano",
    "Alessandro|Sorte",
    "Luca|Squeri",
    "Antonio|Tajani",
    "Rosaria|Tassinari",
    "Chiara|Tenerini",
  ],

  M5S: [
    "Davide|Aiello",
    "Enrica|Alifano",
    "Gaetano|Amato",
    "Chiara|Appendino",
    "Stefania|Ascari",
    "Carmela|Auriemma",
    "Vittoria|Baldino",
    "Valentina|Barzotti",
    "Raffaele|Bruno",
    "Federico|Cafiero De Raho",
    "Luciano|Cantone",
    "Enrico|Cappelletti",
    "Alessandro|Caramiello",
    "Ida|Carmina",
    "Dario|Carotenuto",
    "Antonio|Caso",
    "Susanna|Cherchi",
    "Alfonso|Colucci",
    "Giuseppe|Conte",
    "Sergio|Costa",
    "Valentina|D'Orso",
    "Gianmauro|Dell'Olio",
    "Carmen|Di Lauro",
    "Leonardo|Donno",
    "Giorgio|Fede",
    "Antonio|Ferrara",
    "Ilaria|Fontana",
    "Carla|Giuliano",
    "Michele|Gubitosa",
    "Antonino|Iaria",
    "Patty|L'Abbate",
    "Arnaldo|Lomuti",
    "Daniela|Morfino",
    "Anna Laura|Orrico",
    "Emma|Pavanelli",
    "Marco|Pellegrini",
    "Pasqualino|Penza",
    "Mario|Perantoni",
    "Andrea|Quartini",
    "Angela|Raffa",
    "Marianna|Ricciardi",
    "Riccardo|Ricciardi",
    "Agostino|Santillo",
    "Filippo|Scerra",
    "Francesco|Silvestri",
    "Gilda|Sportiello",
    "Daniela|Torto",
    "Riccardo|Tucci",
  ],

  AZIONE: [
    "Fabrizio|Benzoni",
    "Elena|Bonetti",
    "Antonio|D'Alessio",
    "Valentina|Grippo",
    "Federica|Onori",
    "Giulia|Pastorella",
    "Matteo|Richetti",
    "Ettore|Rosato",
    "Daniela|Ruffino",
    "Giulio Cesare|Sottanelli",
  ],

  AVS: [
    "Angelo|Bonelli",
    "Francesco Emilio|Borrelli",
    "Devis|Dori",
    "Nicola|Fratoianni",
    "Francesca|Ghirra",
    "Marco|Grimaldi",
    "Francesco|Mari",
    "Elisabetta|Piccolotti",
    "Luana|Zanella",
    "Filiberto|Zaratti",
  ],

  NM: [
    "Michela Vittoria|Brambilla",
    "Maria Rosaria|Carfagna",
    "Ilaria|Cavo",
    "Alessandro|Colucci",
    "Maurizio|Lupi",
    "Francesco Saverio|Romano",
    "Martina|Semenzato",
    "Franco|Tirelli",
  ],

  IV: [
    "Francesco|Bonifazi",
    "Maria Elena|Boschi",
    "Mauro|Del Barba",
    "Davide|Faraone",
    "Maria Chiara|Gadda",
    "Roberto|Giachetti",
    "Maria Anna|Madia",
  ],

  FNV: [
    "Davide|Bergamini",
    "Gianangelo|Bof",
    "Domenico|Furgiuele",
    "Attilio|Pierro",
    "Emanuele|Pozzolo",
    "Laura|Ravetto",
    "Rossano|Sasso",
    "Edoardo|Ziello",
  ],

  MINLING: [
    "Renate|Gebhard",
    "Franco|Manes",
    "Manfred|Schullian",
    "Dieter|Steger",
  ],

  EUROPA: ["Benedetto|Della Vedova", "Riccardo|Magi", "Luca|Pastorino"],

  MISTO: [
    "Lorenzo|Cesa",
    "Francesco|Gallo",
    "Luigi|Marattin",
    "Manlio|Messina",
    "Aboubakar|Soumahoro",
    "Bruno|Tabacci",
  ],
};

const deputies = Object.entries(DEPUTIES_BY_GROUP)
  .flatMap(([group, members]) =>
    members.map((member) => {
      const [firstName, lastName] = member.split("|");

      return createDeputy({
        firstName,
        lastName,
        group,
      });
    }),
  )
  .sort((a, b) =>
    a.lastName.localeCompare(b.lastName, "it", {
      sensitivity: "base",
    }),
  );

export default deputies;
