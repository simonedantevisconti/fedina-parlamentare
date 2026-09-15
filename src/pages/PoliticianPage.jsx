import { Link, useParams } from "react-router-dom";

import politicians from "../data/politicians";
import { getJudicialStatus } from "../data/judicialStatuses";

import "../styles/politician-page.css";

const formatDate = (date) => {
  if (!date) {
    return "Non disponibile";
  }

  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const PoliticianPage = () => {
  const { id } = useParams();

  const politician = politicians.find((item) => item.id === id);

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

  return (
    <div className="politician-page">
      {/* HERO */}
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
                  <strong>{politician.legislature}</strong>
                </div>

                <div>
                  <span>Mandati</span>
                  <strong>{politician.mandateNumber}</strong>
                </div>

                <div>
                  <span>Circoscrizione</span>
                  <strong>{politician.constituency}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENUTO */}
      <section className="politician-page__content">
        <div className="container">
          <div className="politician-page__layout">
            {/* SIDEBAR */}
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
                    <dd>{politician.birthPlace ?? "Non disponibile"}</dd>
                  </div>

                  <div>
                    <dt>Circoscrizione</dt>
                    <dd>{politician.constituency}</dd>
                  </div>

                  {politician.lastVerifiedAt && (
                    <div>
                      <dt>Ultima verifica</dt>
                      <dd>{formatDate(politician.lastVerifiedAt)}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>

            {/* MAIN */}
            <div className="politician-page__main">
              {/* STATO GIUDIZIARIO */}
              <section className="politician-page__judicial-section">
                <div className="politician-page__section-heading">
                  <div>
                    <p className="politician-page__section-label">
                      Situazione giudiziaria
                    </p>

                    <h2>Stato attuale</h2>
                  </div>
                </div>

                <div
                  className={`politician-page__status politician-page__status--${politician.judicialStatus}`}
                >
                  <span className="politician-page__status-dot"></span>

                  <div>
                    <strong>{judicialStatus.label}</strong>

                    <p>
                      Lo stato riportato rappresenta l'ultima informazione
                      censita nel database.
                    </p>
                  </div>
                </div>

                <div className="politician-page__presumption">
                  <strong>Presunzione di innocenza</strong>

                  <p>
                    La presenza di un'indagine o di un procedimento giudiziario
                    non implica responsabilità penale. La responsabilità viene
                    considerata accertata in questa piattaforma solamente in
                    presenza di una condanna definitiva.
                  </p>
                </div>
              </section>

              {/* PROCEDIMENTI */}
              <section className="politician-page__proceedings">
                <div className="politician-page__section-heading">
                  <div>
                    <p className="politician-page__section-label">Archivio</p>

                    <h2>Procedimenti</h2>
                  </div>

                  <span className="politician-page__proceedings-count">
                    {proceedings.length}
                  </span>
                </div>

                {proceedings.length === 0 ? (
                  <div className="politician-page__empty">
                    <h3>Nessun procedimento registrato</h3>

                    <p>
                      Al momento non sono presenti procedimenti associati a
                      questa scheda.
                    </p>
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

                          <div className="politician-page__proceeding-grid">
                            <div>
                              <span>
                                {proceeding.finalJudgment
                                  ? "Reato"
                                  : "Ipotesi di reato"}
                              </span>

                              <strong>
                                {proceeding.offence ??
                                  proceeding.allegedOffence ??
                                  "Non disponibile"}
                              </strong>
                            </div>

                            <div>
                              <span>Autorità giudiziaria</span>

                              <strong>
                                {proceeding.court ?? "Non disponibile"}
                              </strong>
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
                          </div>

                          {proceeding.description && (
                            <div className="politician-page__proceeding-description">
                              <p>{proceeding.description}</p>
                            </div>
                          )}

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

                          {proceeding.sources?.length > 0 && (
                            <div className="politician-page__sources">
                              <h4>Fonti</h4>

                              <div className="politician-page__sources-list">
                                {proceeding.sources.map((source, index) =>
                                  source.url === "#" ? (
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
