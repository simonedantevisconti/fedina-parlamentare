import { Link } from "react-router-dom";

import "../styles/not-found.css";

const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <div className="container">
        <div className="not-found-page__content">
          <p className="not-found-page__code">404</p>

          <p className="not-found-page__eyebrow">Pagina non trovata</p>

          <h1>Questa pagina non esiste.</h1>

          <p className="not-found-page__description">
            Il collegamento potrebbe essere errato oppure la pagina potrebbe
            essere stata spostata.
          </p>

          <div className="not-found-page__actions">
            <Link
              to="/"
              className="not-found-page__button not-found-page__button--primary"
            >
              Torna alla homepage
            </Link>

            <Link
              to="/camera"
              className="not-found-page__button not-found-page__button--secondary"
            >
              Consulta la Camera
            </Link>

            <Link
              to="/senato"
              className="not-found-page__button not-found-page__button--secondary"
            >
              Consulta il Senato
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
