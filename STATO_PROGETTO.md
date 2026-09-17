# Stato del progetto Fedina Parlamentare

Aggiornato al 17 settembre 2026. Questo documento descrive lo stato **dei dati presenti nel repository**, non certifica la situazione giudiziaria attuale dei parlamentari.

## A che punto è il lavoro

Il dataset del progetto contiene 603 persone: 398 deputati e 205 senatori. Ogni persona ha un file JSON in `src/data/judicial/people/`, ma la presenza del file non significa che la ricerca sia stata svolta.

| Stato della verifica | Persone | Significato |
| --- | ---: | --- |
| `complete` | 57 | Ricerca conclusa sulle fonti disponibili alla data indicata nella scheda. |
| `complete-with-follow-up` | 26 | Sono emerse vicende che richiedono ulteriori riscontri, spesso sull'esito o sulla definitività. |
| `preliminary` | 104 | Ricerca iniziale svolta; approfondimento ancora necessario. |
| `not-started` | 416 | Nessuna ricerca individuale registrata. |

Questi numeri provengono da `npm run audit:judicial`. L'ultimo audit non ha rilevato errori strutturali. **Non sono stati trovati e verificati dati completi per tutti i 603 parlamentari.** Nessuno dei 26 casi da approfondire è stato chiuso solo perché non è stata trovata una notizia successiva.

In cinque dei 26 casi esiste una notizia pubblica su un procedimento, ma manca ancora una scheda `record` pubblicabile con un esito personale sufficientemente verificato: `alfredo-antoniozzi`, `francesco-battistoni`, `alessandro-cattaneo`, `luciano-ciocchetti`, `dimitri-coin`. I relativi file JSON conservano le fonti e le lacune nella sezione `review`.

Fra gli ultimi approfondimenti, i procedimenti distinti di Galliani, Lotito e Gasparri sono stati separati nelle rispettive schede; per Brambilla è stato aggiunto un proscioglimento distinto, riportato da ANSA. Le posizioni ancora prive di riscontro sulla definitività restano marcate come tali. Questi aggiornamenti non chiudono la verifica complessiva delle quattro persone.

## Come funziona il progetto

L'app è costruita con React e Vite. `src/data/deputies.js` e `src/data/senators.js` definiscono l'elenco delle persone usato dall'app; `src/data/parties.js` contiene i partiti. `src/data/createPolitician.js` prepara ID e campi comuni.

Il file modificabile per la verifica giudiziaria di una persona è `src/data/judicial/people/<id>.json`:

- `review` documenta il lavoro di ricerca: fase, data, query, fonti consultate e questioni irrisolte.
- `record` contiene i procedimenti mostrabili al pubblico, oppure è `null` se non esiste ancora una scheda pubblicabile. Ogni procedimento ha un ID stabile, stato, descrizione, date, cronologia e fonti.
- `finalJudgment` distingue `true` (definitività documentata), `false` (decisione non definitiva documentata) e `null` (definitività non accertata).

`scripts/buildJudicialData.mjs` valida i file e genera `src/data/judicial/generated/index.json` e `loaders.js`. **Non modificare a mano i file in `generated/`.** L'indice contiene solo gli stati e i conteggi necessari a elenchi, filtri ed emicicli; le descrizioni e le fonti sono caricate quando si apre la scheda individuale. `src/data/judicialReviewLog.js` espone lo stato sintetico di tutti; `src/data/judicialRecords.js` carica i dettagli della persona richiesta.

## Come proseguire una verifica

1. Eseguire `npm run audit:judicial -- --list` per vedere i nomi divisi per stato. Cominciare dai 26 `follow-up`, poi dai 104 `preliminary` e infine dai 416 `not-started`.
2. Aprire `src/data/judicial/people/<id>.json` e confrontare ogni vicenda con fonti attendibili e datate. Cercare anche gli sviluppi successivi: archiviazione, rinvio a giudizio, sentenze, appelli e Cassazione.
3. Registrare in `review` la data effettiva della ricerca, le query, i link e ciò che manca. Distinguere omonimi e ruoli diversi: indagato o imputato, testimone, avvocato e persona offesa.
4. Aggiornare `record.proceedings` solo con fatti attribuibili a quella persona e a quello specifico procedimento. Una vecchia notizia di indagine non prova che il caso sia ancora aperto; un'assoluzione in primo grado non prova da sola che sia definitiva. La mancanza di risultati online non prova l'assenza di precedenti penali.
5. Eseguire `npm run data:build` dopo la modifica. Poi usare `npm run data:check`, `npm run audit:judicial`, `npm run lint`, `npm test` e `npm run build` per verificare dati e app.

`npm run dev` e `npm run build` rigenerano automaticamente l'indice prima di partire. Se il server di sviluppo è già aperto, eseguire `npm run data:build` dopo aver cambiato i JSON. Nell'ultima verifica i controlli dati, lint, cinque test e build erano riusciti. Su questo ambiente Windows, test e build hanno richiesto l'esecuzione fuori dal sandbox perché altrimenti il sistema restituiva `spawn EPERM`.

## Limiti da mantenere visibili

Il progetto usa gli elenchi parlamentari presenti nel repository; l'audit non verifica se composizione delle Camere e gruppi siano aggiornati oggi. Le fonti pubbliche consultabili non equivalgono a un certificato del casellario giudiziale. Una scheda `complete` indica che la ricerca documentata è stata conclusa alla data riportata, non che ogni possibile procedimento sia stato escluso per sempre.
