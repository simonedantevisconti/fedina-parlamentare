import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import politicians from "../data/politicians";
import { getJudicialStatus } from "../data/judicialStatuses";
import { loadJudicialRecord } from "../data/judicialRecords.js";

import "../styles/politician-page.css";

const formatDate = (date) => {
  if (!date) {
    return "Non disponibile";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Non disponibile";
  }

  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

const displayValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Non disponibile";
  }

  return value;
};

const getOffenceLabel = (proceeding) => {
  if (proceeding.status === "convicted-final") {
    return "Reato oggetto di condanna definitiva";
  }

  if (proceeding.status === "convicted-non-final") {
    return "Reato contestato";
  }

  return "Ipotesi di reato";
};

const PoliticianPage = () => {
  const { id } = useParams();

  const summaryPolitician = politicians.find((item) => item.id === id);
  const [loaded, setLoaded] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    loadJudicialRecord(id).then(
      (data) => { if (active) setLoaded({ id, attempt, data }); },
      () => { if (active) setLoaded({ id, attempt, error: true }); },
    );
    return () => { active = false; };
  }, [id, attempt]);

  const current = loaded?.id === id && loaded?.attempt === attempt ? loaded : null;
  const details = current?.data;
  const loading = summaryPolitician?.judicialReview.stage !== "not-started" && !current;
  const politician = summaryPolitician && {
    ...summaryPolitician,
    proceedings: details?.record?.proceedings ?? [],
  };

  if (!politician) {
    return (
      <section className="politician-page politician-page--not-found">
        <div className="container">
          <div className="politician-page__not-found">
            <p className="politician-page__eyebrow">Fedina Parlamentare</p>

            <h1>Politico non trovato</h1>

            <p>La scheda richiesta non è presente nel database.</p>

            <Link to="/" className="politician-page__back-button">
              Torna alla homepage
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const fullName = `${politician.firstName} ${politician.lastName}`;

  const institutionalRole =
    politician.chamber === "senato" ? "Senatore" : "Deputato";

  const chamberLabel =
    politician.chamber === "senato"
      ? "Senato della Repubblica"
      : "Camera dei Deputati";

  const chamberPath = politician.chamber === "senato" ? "/senato" : "/camera";

  const proceedings = politician.proceedings ?? [];

  const judicialStatus = getJudicialStatus(politician.judicialStatus);

  const judicialSummary = politician.judicialSummary;

  const proceedingCount =
    judicialSummary?.proceedingCount ?? proceedings.length;

  const judicialReviewed = politician.judicialVerification?.reviewed === true;

  const judicialLastVerifiedAt =
    politician.judicialVerification?.lastVerifiedAt;
  const reviewStage = politician.judicialReview.stage;
  const reviewLabel = reviewStage === "not-started"
    ? "Verifica non iniziata"
    : reviewStage === "complete"
      ? "Verifica completata sulle fonti disponibili"
      : reviewStage === "preliminary"
        ? "Ricerca preliminare: approfondimento necessario"
        : "Verifica da approfondire o aggiornare";

  const institutionalLastVerifiedAt =
    politician.institutionalVerification?.lastVerifiedAt;

  return (
    <div className="politician-page">
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="politician-page__hero">
        <div className="container">
          <Link to={chamberPath} className="politician-page__back">
            ← Torna a {chamberLabel}
          </Link>

          <div className="politician-page__hero-grid">
            <div className="politician-page__photo-wrapper">
              <img
                src={politician.photo}
                alt={fullName}
                className="politician-page__photo"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="politician-page__photo-fallback">
                <span>
                  {politician.firstName.charAt(0)}
                  {politician.lastName.charAt(0)}
                </span>
              </div>
            </div>

            <div className="politician-page__identity">
              <p className="politician-page__eyebrow">
                {institutionalRole} · {chamberLabel}
              </p>

              <h1>{fullName}</h1>

              <div className="politician-page__party">
                <span>{politician.party.acronym}</span>

                <strong>{politician.party.name}</strong>
              </div>

              <div className="politician-page__meta">
                <div>
                  <span>Legislatura</span>

                  <strong>{displayValue(politician.legislature)}</strong>
                </div>

                <div>
                  <span>Mandati</span>

                  <strong>{displayValue(politician.mandateNumber)}</strong>
                </div>

                <div>
                  <span>Circoscrizione</span>

                  <strong>{displayValue(politician.constituency)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CONTENUTO
      ================================================== */}

      <section className="politician-page__content">
        <div className="container">
          <div className="politician-page__layout">
            {/* ============================================
                SIDEBAR
            ============================================ */}

            <aside className="politician-page__sidebar">
              <div className="politician-page__info-card">
                <p className="politician-page__section-label">Informazioni</p>

                <dl>
                  <div>
                    <dt>Nome</dt>

                    <dd>{politician.firstName}</dd>
                  </div>

                  <div>
                    <dt>Cognome</dt>

                    <dd>{politician.lastName}</dd>
                  </div>

                  <div>
                    <dt>Carica</dt>

                    <dd>{institutionalRole}</dd>
                  </div>

                  <div>
                    <dt>Partito</dt>

                    <dd>{politician.party.name}</dd>
                  </div>

                  <div>
                    <dt>Data di nascita</dt>

                    <dd>{formatDate(politician.birthDate)}</dd>
                  </div>

                  <div>
                    <dt>Luogo di nascita</dt>

                    <dd>{displayValue(politician.birthPlace)}</dd>
                  </div>

                  <div>
                    <dt>Circoscrizione</dt>

                    <dd>{displayValue(politician.constituency)}</dd>
                  </div>

                  {politician.chamber === "senato" &&
                    politician.senatorType && (
                      <div>
                        <dt>Tipo di mandato</dt>

                        <dd>
                          {politician.senatorType === "life"
                            ? "Senatore a vita"
                            : "Senatore eletto"}
                        </dd>
                      </div>
                    )}

                  {institutionalLastVerifiedAt && (
                    <div>
                      <dt>Dati istituzionali verificati</dt>

                      <dd>{formatDate(institutionalLastVerifiedAt)}</dd>
                    </div>
                  )}

                  {judicialLastVerifiedAt && (
                    <div>
                      <dt>Dati giudiziari verificati</dt>

                      <dd>{formatDate(judicialLastVerifiedAt)}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>

            {/* ============================================
                MAIN
            ============================================ */}

            <div className="politician-page__main">
              {/* ==========================================
                  STATO GIUDIZIARIO
              ========================================== */}

              <section className="politician-page__judicial-section">
                <div className="politician-page__section-heading">
                  <div>
                    <p className="politician-page__section-label">
                      Situazione giudiziaria
                    </p>

                    <h2>Quadro documentato</h2>
                  </div>
                </div>

                <div
                  className={`politician-page__status politician-page__status--${politician.judicialStatus}`}
                >
                  <span className="politician-page__status-dot"></span>

                  <div>
                    <strong>{judicialStatus.label}</strong>

                    {politician.judicialStatus === "not-reviewed" && (
                      <p>
                        La verifica delle fonti giudiziarie per questa scheda
                        non è stata ancora completata.
                      </p>
                    )}

                    {politician.judicialStatus === "clean" && (
                      <p>
                        Alla data dell&apos;ultima verifica non sono stati
                        individuati procedimenti giudiziari pubblicamente
                        documentati nelle fonti consultate.
                      </p>
                    )}

                    {politician.judicialStatus === "multiple" && (
                      <p>
                        Sono presenti <strong>{proceedingCount}</strong>{" "}
                        procedimenti documentati con stati o esiti differenti.
                      </p>
                    )}

                    {politician.judicialStatus !== "not-reviewed" &&
                      politician.judicialStatus !== "clean" &&
                      politician.judicialStatus !== "multiple" && (
                        <p>
                          Lo stato riportato deriva dai procedimenti e dalle
                          fonti censite nella scheda.
                        </p>
                      )}
                  </div>
                </div>

                {/* ========================================
                    RIEPILOGO MULTI-PROCEDIMENTO
                ======================================== */}

                {judicialSummary && proceedingCount > 0 && (
                  <div className="politician-page__judicial-summary">
                    {judicialSummary.hasFinalConviction && (
                      <span>Condanna definitiva documentata</span>
                    )}

                    {judicialSummary.hasNonFinalConviction && (
                      <span>Condanna non definitiva documentata</span>
                    )}

                    {judicialSummary.hasOngoingProceedings && (
                      <span>Procedimento aperto all’ultimo atto documentato</span>
                    )}

                    {judicialSummary.hasAcquittals && (
                      <span>Assoluzione documentata</span>
                    )}

                    {judicialSummary.hasArchivedProceedings && (
                      <span>Archiviazione documentata</span>
                    )}

                    {judicialSummary.hasDismissedProceedings && (
                      <span>Proscioglimento documentato</span>
                    )}
                  </div>
                )}

                {/* ========================================
                    PRESUNZIONE DI INNOCENZA
                ======================================== */}

                <div className="politician-page__presumption">
                  <strong>Presunzione di innocenza</strong>

                  <p>
                    La presenza di un&apos;indagine o di un procedimento
                    giudiziario non implica responsabilità penale. La
                    responsabilità viene considerata accertata in questa
                    piattaforma solamente in presenza di una condanna
                    definitiva.
                  </p>
                </div>

                {/* ========================================
                    VERIFICA
                ======================================== */}

                <div className="politician-page__verification">
                  <span>Verifica giudiziaria</span>

                  <strong>
                    {reviewLabel}
                  </strong>

                  {politician.judicialReview.lastCheckedAt && (
                    <small>
                      Ultimo controllo: {formatDate(politician.judicialReview.lastCheckedAt)}
                    </small>
                  )}
                  {details?.review?.notes && <p>{details.review.notes}</p>}
                  <small>
                    Gli stati descrivono l’ultimo atto documentato per ciascun
                    procedimento. La data del controllo delle fonti può essere
                    successiva alla data di quell’atto.
                  </small>
                </div>
              </section>

              {/* ==========================================
                  PROCEDIMENTI
              ========================================== */}

              <section className="politician-page__proceedings">
                <div className="politician-page__section-heading">
                  <div>
                    <p className="politician-page__section-label">Archivio</p>

                    <h2>Procedimenti</h2>
                  </div>

                  <span className="politician-page__proceedings-count">
                    {proceedingCount}
                  </span>
                </div>

                {loading ? (
                  <p role="status">Caricamento dei procedimenti e delle fonti…</p>
                ) : current?.error ? (
                  <div role="alert" className="politician-page__empty">
                    <p>Non è stato possibile caricare i dettagli della scheda.</p>
                    <button type="button" onClick={() => setAttempt((value) => value + 1)}>Riprova</button>
                  </div>
                ) : proceedings.length === 0 ? (
                  <div className="politician-page__empty">
                    {judicialReviewed && politician.judicialStatus === "clean" ? (
                      <>
                        <h3>Nessun procedimento pubblico registrato</h3>

                        <p>
                          Nelle fonti consultate durante l&apos;ultima verifica
                          non risultano procedimenti pubblicamente documentati
                          associati a questa scheda.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3>Verifica non ancora completata</h3>

                        <p>
                          La ricerca delle fonti giudiziarie per questa scheda
                          non è stata ancora effettuata o completata.
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="politician-page__proceedings-list">
                    {proceedings.map((proceeding) => {
                      const proceedingStatus = getJudicialStatus(
                        proceeding.status,
                      );

                      return (
                        <article
                          className="politician-page__proceeding"
                          key={proceeding.id}
                        >
                          {/* ============================
                                HEADER PROCEDIMENTO
                            ============================ */}

                          <div className="politician-page__proceeding-header">
                            <div>
                              <p>{proceedingStatus.label}</p>

                              <h3>{proceeding.title}</h3>
                            </div>

                            <span
                              className={`politician-page__proceeding-badge politician-page__proceeding-badge--${proceeding.status}`}
                            >
                              {proceedingStatus.label}
                            </span>
                          </div>

                          {/* ============================
                                DATI PROCEDIMENTO
                            ============================ */}

                          <div className="politician-page__proceeding-grid">
                            <div>
                              <span>{getOffenceLabel(proceeding)}</span>

                              <strong>
                                {proceeding.offence ??
                                  proceeding.allegedOffence ??
                                  "Non disponibile"}
                              </strong>
                            </div>

                            <div>
                              <span>Autorità giudiziaria</span>

                              <strong>{displayValue(proceeding.court)}</strong>
                            </div>

                            <div>
                              <span>Inizio</span>

                              <strong>
                                {formatDate(proceeding.startDate)}
                              </strong>
                            </div>

                            <div>
                              <span>Ultimo aggiornamento</span>

                              <strong>
                                {formatDate(proceeding.lastUpdate)}
                              </strong>
                            </div>

                            <div>
                              <span>Definitività dell&apos;esito</span>
                              <strong>
                                {proceeding.status === "parliamentary-immunity"
                                  ? "Delibera parlamentare"
                                  : proceeding.finalJudgment === true
                                    ? "Documentata dalle fonti"
                                    : "Non documentata"}
                              </strong>
                            </div>
                            {proceeding.finalJudgmentDate && (
                              <div>
                                <span>Data esito definitivo</span>

                                <strong>
                                  {formatDate(proceeding.finalJudgmentDate)}
                                </strong>
                              </div>
                            )}
                          </div>

                          {/* ============================
                                DESCRIZIONE
                            ============================ */}

                          {proceeding.description && (
                            <div className="politician-page__proceeding-description">
                              <p>{proceeding.description}</p>
                            </div>
                          )}

                          {/* ============================
                                TIMELINE
                            ============================ */}

                          {proceeding.timeline?.length > 0 && (
                            <div className="politician-page__timeline">
                              <h4>Evoluzione del procedimento</h4>

                              <div className="politician-page__timeline-list">
                                {proceeding.timeline.map((event, index) => (
                                  <div
                                    className="politician-page__timeline-item"
                                    key={`${event.date}-${index}`}
                                  >
                                    <div className="politician-page__timeline-marker">
                                      <span></span>
                                    </div>

                                    <div>
                                      <time>{formatDate(event.date)}</time>

                                      <strong>{event.title}</strong>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* ============================
                                FONTI
                            ============================ */}

                          {proceeding.sources?.length > 0 && (
                            <div className="politician-page__sources">
                              <h4>Fonti</h4>

                              <div className="politician-page__sources-list">
                                {proceeding.sources.map((source, index) =>
                                  !source.url || source.url === "#" ? (
                                    <span key={`${source.name}-${index}`}>
                                      {source.name}
                                    </span>
                                  ) : (
                                    <a
                                      key={`${source.name}-${index}`}
                                      href={source.url}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {source.name} ↗
                                    </a>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoliticianPage;
