import "../styles/methodology.css";

const MethodologyPage = () => {
  const statuses = [
    {
      label: "Nessun procedimento noto",
      className: "clean",
      description:
        "Non risultano procedimenti giudiziari censiti nelle fonti utilizzate dal progetto.",
    },
    {
      label: "Indagato",
      className: "ongoing",
      description:
        "La persona risulta coinvolta in una fase di indagine. Non implica colpevolezza.",
    },
    {
      label: "Imputato",
      className: "ongoing",
      description:
        "È stata formalmente esercitata l'azione penale, secondo le informazioni censite.",
    },
    {
      label: "Processo in corso",
      className: "ongoing",
      description:
        "Il procedimento è nella fase processuale e non risulta ancora concluso definitivamente.",
    },
    {
      label: "Condanna non definitiva",
      className: "non-final",
      description:
        "È presente una sentenza di condanna che non risulta ancora definitiva.",
    },
    {
      label: "Condanna definitiva",
      className: "final",
      description: "La condanna risulta definitiva nelle fonti censite.",
    },
    {
      label: "Assolto",
      className: "concluded",
      description:
        "Il procedimento si è concluso con una sentenza di assoluzione.",
    },
    {
      label: "Procedimento archiviato",
      className: "concluded",
      description: "Il procedimento risulta concluso con archiviazione.",
    },
  ];

  return (
    <div className="methodology-page">
      {/* HERO */}
      <section className="methodology-page__hero">
        <div className="container">
          <p className="methodology-page__eyebrow">Fedina Parlamentare</p>

          <h1>Metodologia</h1>

          <p className="methodology-page__description">
            Fedina Parlamentare organizza informazioni pubbliche relative ai
            membri del Parlamento e agli eventuali procedimenti giudiziari loro
            associati, mantenendo distinta ogni fase del procedimento e
            indicando le fonti utilizzate.
          </p>
        </div>
      </section>

      <section className="methodology-page__content">
        <div className="container">
          {/* PRINCIPI */}
          <section className="methodology-section">
            <div className="methodology-section__heading">
              <span>01</span>

              <div>
                <p>Principi</p>

                <h2>Separare i fatti documentati dalle accuse</h2>
              </div>
            </div>

            <div className="methodology-text">
              <p>
                La presenza di una persona in un'indagine, in un procedimento o
                in un processo non viene presentata come prova della commissione
                di un reato.
              </p>

              <p>
                La piattaforma distingue sempre lo stato procedurale
                dell'informazione: indagine, imputazione, processo, condanna non
                definitiva, condanna definitiva, assoluzione o archiviazione.
              </p>

              <div className="methodology-callout">
                <strong>Presunzione di innocenza</strong>

                <p>
                  La responsabilità penale viene indicata come definitivamente
                  accertata solamente quando le fonti censite riportano una
                  condanna definitiva.
                </p>
              </div>
            </div>
          </section>

          {/* STATI */}
          <section className="methodology-section">
            <div className="methodology-section__heading">
              <span>02</span>

              <div>
                <p>Classificazione</p>

                <h2>Stati giudiziari utilizzati</h2>
              </div>
            </div>

            <div className="methodology-status-grid">
              {statuses.map((status) => (
                <article className="methodology-status" key={status.label}>
                  <div className="methodology-status__heading">
                    <span
                      className={`methodology-status__dot methodology-status__dot--${status.className}`}
                    ></span>

                    <h3>{status.label}</h3>
                  </div>

                  <p>{status.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* FONTI */}
          <section className="methodology-section">
            <div className="methodology-section__heading">
              <span>03</span>

              <div>
                <p>Verifica</p>

                <h2>Fonti</h2>
              </div>
            </div>

            <div className="methodology-text">
              <p>
                Ogni procedimento dovrà essere accompagnato da una o più fonti
                consultabili. Le fonti istituzionali e giudiziarie vengono
                privilegiate quando disponibili.
              </p>

              <div className="methodology-source-list">
                <div>
                  <strong>Fonti istituzionali</strong>

                  <p>
                    Camera dei Deputati, Senato della Repubblica e altre
                    amministrazioni pubbliche.
                  </p>
                </div>

                <div>
                  <strong>Fonti giudiziarie</strong>

                  <p>
                    Provvedimenti, sentenze, comunicazioni ufficiali e altri
                    documenti giudiziari pubblicamente disponibili.
                  </p>
                </div>

                <div>
                  <strong>Fonti giornalistiche</strong>

                  <p>
                    Articoli provenienti da testate identificabili, utilizzati
                    insieme alla data di pubblicazione e al collegamento
                    originale.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* AGGIORNAMENTI */}
          <section className="methodology-section">
            <div className="methodology-section__heading">
              <span>04</span>

              <div>
                <p>Aggiornamento</p>

                <h2>I dati possono cambiare</h2>
              </div>
            </div>

            <div className="methodology-text">
              <p>
                Un procedimento giudiziario può evolvere nel tempo. Una persona
                inizialmente indagata può essere archiviata, assolta, condannata
                oppure vedere il procedimento modificarsi in altra forma.
              </p>

              <p>
                Per questo ogni scheda dovrà mostrare una data di ultima
                verifica e mantenere lo storico delle fasi rilevanti del
                procedimento.
              </p>
            </div>
          </section>

          {/* DATI PARLAMENTARI */}
          <section className="methodology-section">
            <div className="methodology-section__heading">
              <span>05</span>

              <div>
                <p>Dati istituzionali</p>

                <h2>Informazioni parlamentari</h2>
              </div>
            </div>

            <div className="methodology-text">
              <p>
                Nome, appartenenza parlamentare, legislatura, circoscrizione e
                altri dati istituzionali vengono verificati attraverso le fonti
                ufficiali della Camera dei Deputati e del Senato della
                Repubblica.
              </p>

              <p>
                Le informazioni relative alla composizione delle Camere possono
                cambiare nel corso della legislatura e devono quindi essere
                aggiornate quando le fonti istituzionali registrano variazioni.
              </p>
            </div>
          </section>

          {/* CORREZIONI */}
          <section className="methodology-section methodology-section--last">
            <div className="methodology-section__heading">
              <span>06</span>

              <div>
                <p>Correzioni</p>

                <h2>Trasparenza sulle modifiche</h2>
              </div>
            </div>

            <div className="methodology-text">
              <p>
                Se una fonte viene corretta, una sentenza viene modificata o
                emergono informazioni più aggiornate, la scheda interessata deve
                essere aggiornata mantenendo una formulazione coerente con lo
                stato effettivamente documentato.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default MethodologyPage;
