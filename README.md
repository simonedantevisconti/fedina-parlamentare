# Fedina Parlamentare

Applicazione React/Vite che censisce le informazioni pubbliche sui procedimenti
giudiziari dei parlamentari presenti negli elenchi del progetto.

## Avvio e controlli

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

`dev` e `build` rigenerano prima l'indice e validano i dati. Dopo una modifica ai
JSON con il server già aperto, eseguire `npm run data:build` per aggiornare anche
gli elenchi. `npm run data:check` verifica che gli artefatti generati siano allineati.

## Struttura dei dati

- `src/data/deputies.js` e `senators.js`: elenchi e appartenenze ai gruppi del dataset.
- `src/data/parties.js`: anagrafica dei partiti, condivisa da tutti i parlamentari.
- `src/data/createPolitician.js`: ID e campi comuni delle anagrafiche.
- `src/data/judicial/people/<id>.json`: fonte modificabile, un file per ogni persona.
  Contiene `review` (ricerca editoriale) e `record` (procedimenti pubblicabili).
- `src/data/judicial/generated/`: indice leggero e caricamenti dinamici, generati
  automaticamente; non modificare a mano.
- `src/data/judicialReviewLog.js`: registro sintetico che comprende tutti gli ID.
- `src/data/judicialRecords.js`: caricamento asincrono della scheda individuale.
- `scripts/lib/judicialData.mjs`: validazione e generazione dei dati condivise dagli strumenti.

Gli elenchi, i filtri e gli emicicli usano solo gli stati e i conteggi. Descrizioni,
cronologie e fonti vengono scaricate quando si apre la singola scheda. La pagina
gestisce caricamento, errore e nuovo tentativo senza mostrare un archivio vuoto
come se fosse l'esito della ricerca.

## Fotografie e simboli

- `public/politici/`: 603 ritratti associati agli ID locali. Il relativo
  `manifest.json` conserva per ogni file l'identificativo e l'URL dichiarati dai
  dati ufficiali di Camera o Senato.
- `public/partiti/`: simboli dei nove partiti censiti e un manifesto con le fonti.
  Il gruppo Misto non ha un unico simbolo di partito e usa quindi il fallback
  grafico dell'interfaccia.
- `src/data/generated/partyLogos.js`: mappa generata fra sigla e file locale,
  usata da `parties.js`.

Per aggiornare gli asset:

```sh
npm run assets:portraits
npm run assets:parties
```

Gli script verificano il formato delle risposte prima di salvarle e scrivono i
manifesti di provenienza. Le fotografie nelle liste vengono caricate solo quando
si avvicinano all'area visibile, così l'apertura della pagina non trasferisce
l'intero archivio.

## Aggiungere o aggiornare una verifica

1. Aprire il JSON corrispondente all'ID generato dall'anagrafica.
2. Registrare in `review` la data effettiva, le query eseguite, le fonti consultate,
   le esclusioni per omonimia o ruolo (avvocato, testimone, parte offesa) e le lacune.
3. Inserire in `record.proceedings` solo vicende personali documentate. Ogni
   procedimento deve avere un ID stabile, stato, descrizione, cronologia e fonti
   con editore, URL, data di pubblicazione se nota e data di consultazione.
4. Cercare espressamente gli sviluppi successivi, inclusi assoluzioni,
   archiviazioni, prescrizioni e impugnazioni. Una notizia storica di indagine
   non dimostra che il procedimento sia ancora aperto.
5. Eseguire `npm run data:build`, `npm test` e `npm run build`.

I file iniziali senza ricerca usano `stage: "not-started"`, data nulla e `record:
null`. La presenza di un file registra la persona, non una verifica compiuta.

Gli stati `preliminary`, `complete-with-follow-up` e `legacy-record` mantengono
visibili gli approfondimenti necessari. `complete` descrive la conclusione della
ricerca sulle fonti disponibili alla data indicata, non un certificato penale e
non l'irrevocabilità di tutte le decisioni.

`finalJudgment` ammette `true`, `false` e `null`: definitività documentata,
decisione non definitiva, informazione non verificata. Una data ignota resta
`null`; la data di un articolo non diventa la data della sentenza. Le delibere di
insindacabilità hanno uno stato dedicato e non sono classificate come assoluzioni.

Le schede ereditate dal dataset sono preservate durante la migrazione. Le relative
date e affermazioni di verifica non attestano una nuova consultazione delle fonti.
Per i nuovi controlli vengono registrate anche le query e le eventuali lacune.

## Limiti della copertura

La validazione usa gli elenchi effettivi del progetto. Non certifica da sola che
la composizione del Parlamento o le appartenenze ai gruppi siano aggiornate.
L'assenza di riscontri pubblici non equivale a un certificato del casellario
giudiziale; i procedimenti in corso restano distinti dalle condanne definitive.
