import { Link } from "react-router-dom";
import "../styles/home.css";

const HomePage = () => {
  const stats = [
    {
      id: "clean",
      value: "—",
      label: "Nessun procedimento noto",
      description:
        "Parlamentari per i quali non risultano procedimenti giudiziari censiti.",
    },
    {
      id: "ongoing",
      value: "—",
      label: "Procedimenti in corso",
      description:
        "Indagini, procedimenti o processi non ancora conclusi definitivamente.",
    },
    {
      id: "convicted",
      value: "—",
      label: "Condanne definitive",
      description:
        "Condanne passate in giudicato e registrate nelle fonti utilizzate.",
    },
  ];

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">
              Trasparenza · Parlamento · Giustizia
            </p>

            <h1 className="home-hero__title">
              Conosci chi
              <span> ti rappresenta.</span>
            </h1>

            <p className="home-hero__description">
              Fedina Parlamentare raccoglie e organizza informazioni documentate
              sui procedimenti giudiziari che hanno coinvolto deputati e
              senatori della Repubblica Italiana.
            </p>

            <p className="home-hero__secondary">
              Ogni informazione viene associata al suo stato giudiziario, alla
              data di aggiornamento e alle relative fonti.
            </p>

            <div className="home-hero__actions">
              <Link
                to="/camera"
                className="home-hero__button home-hero__button--primary"
              >
                Esplora la Camera
              </Link>

              <button
                type="button"
                className="home-hero__button home-hero__button--secondary"
              >
                Esplora il Senato
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STATISTICHE */}
      <section className="home-stats">
        <div className="container">
          <div className="home-section-heading">
            <div>
              <p className="home-section-heading__eyebrow">
                Il Parlamento in numeri
              </p>

              <h2>Situazione giudiziaria</h2>
            </div>

            <p className="home-section-heading__description">
              Una panoramica sintetica dello stato delle informazioni
              giudiziarie censite nel database.
            </p>
          </div>

          <div className="row g-4">
            {stats.map((stat) => (
              <div className="col-12 col-md-4" key={stat.id}>
                <article
                  className={`home-stat-card home-stat-card--${stat.id}`}
                >
                  <div className="home-stat-card__top">
                    <span className="home-stat-card__indicator"></span>

                    <span className="home-stat-card__value">{stat.value}</span>
                  </div>

                  <h3>{stat.label}</h3>

                  <p>{stat.description}</p>
                </article>
              </div>
            ))}
          </div>

          <p className="home-stats__note">
            I dati statistici saranno disponibili quando verrà completato il
            primo popolamento del database.
          </p>
        </div>
      </section>

      {/* PRINCIPIO EDITORIALE */}
      <section className="home-principle">
        <div className="container">
          <div className="home-principle__card">
            <div className="home-principle__number">01</div>

            <div className="home-principle__content">
              <p className="home-principle__eyebrow">
                Un principio fondamentale
              </p>

              <h2>Un procedimento giudiziario non equivale a una condanna.</h2>

              <p>
                Fedina Parlamentare distingue chiaramente tra indagine,
                imputazione, processo, condanna non definitiva, condanna
                definitiva, assoluzione e archiviazione.
              </p>

              <p>
                La responsabilità penale viene considerata accertata solamente
                nei casi in cui sia presente una sentenza definitiva.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
