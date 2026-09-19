import { Link } from "react-router-dom";

import politicians from "../data/politicians";
import { getHomepageJudicialCategory } from "../data/judicialSummary";

import "../styles/home.css";

const HomePage = () => {
  const totalPoliticians = politicians.length;

  const categoryCounts = politicians.reduce(
    (counts, politician) => {
      const category = getHomepageJudicialCategory(
        politician.judicialSummary,
      );

      counts[category] += 1;
      return counts;
    },
    { clean: 0, ongoing: 0, convicted: 0, concluded: 0 },
  );

  const getPercentage = (value) => {
    if (totalPoliticians === 0) {
      return 0;
    }

    return Math.round((value / totalPoliticians) * 100);
  };

  const stats = [
    {
      id: "clean",
      count: categoryCounts.clean,
      percentage: getPercentage(categoryCounts.clean),
      label: "Nessun procedimento noto",
      description:
        "Parlamentari per i quali non risultano procedimenti registrati nel dataset.",
    },
    {
      id: "ongoing",
      count: categoryCounts.ongoing,
      percentage: getPercentage(categoryCounts.ongoing),
      label: "Procedimenti in corso",
      description:
        "Indagini, imputazioni, processi, condanne non definitive o esiti ancora da verificare.",
    },
    {
      id: "convicted",
      count: categoryCounts.convicted,
      percentage: getPercentage(categoryCounts.convicted),
      label: "Condanne definitive",
      description: "Casi registrati con una condanna definitiva.",
    },
    {
      id: "concluded",
      count: categoryCounts.concluded,
      percentage: getPercentage(categoryCounts.concluded),
      label: "Assolti o archiviati",
      description:
        "Assoluzioni, archiviazioni e altri esiti conclusi registrati.",
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

              <Link
                to="/senato"
                className="home-hero__button home-hero__button--secondary"
              >
                Esplora il Senato
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICHE */}
      <section className="home-stats">
        <div className="container">
          <div className="home-section-heading">
            <div>
              <p className="home-section-heading__eyebrow">
                Il Parlamento in numeri
              </p>

              <h2>Situazione giudiziaria</h2>
            </div>

            <div className="home-section-heading__side">
              <strong>{totalPoliticians}</strong>

              <span>parlamentari presenti nel dataset</span>
            </div>
          </div>

          <div className="row g-4">
            {stats.map((stat) => (
              <div className="col-12 col-md-6 col-xl-3" key={stat.id}>
                <article
                  className={`home-stat-card home-stat-card--${stat.id}`}
                >
                  <div
                    className="home-stat-card__chart"
                    style={{
                      "--percentage": `${stat.percentage}%`,
                    }}
                  >
                    <div className="home-stat-card__chart-inner">
                      <strong>{stat.percentage}%</strong>
                    </div>
                  </div>

                  <div className="home-stat-card__content">
                    <div className="home-stat-card__heading">
                      <span className="home-stat-card__indicator"></span>

                      <span className="home-stat-card__count">
                        {stat.count}
                      </span>
                    </div>

                    <h3>{stat.label}</h3>

                    <p>{stat.description}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <p className="home-stats__note">
            Le statistiche sono calcolate automaticamente sulle schede
            attualmente presenti nel dataset.
          </p>
        </div>
      </section>

      {/* PRINCIPIO */}
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
                La responsabilità penale viene considerata accertata nella
                piattaforma solamente quando il procedimento registrato risulta
                concluso con una condanna definitiva.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
