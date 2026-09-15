import { Link } from "react-router-dom";

import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <div>
            <p className="site-footer__brand">Fedina Parlamentare</p>

            <p className="site-footer__description">
              Archivio informativo sui procedimenti giudiziari riguardanti
              deputati e senatori italiani.
            </p>
          </div>

          <nav className="site-footer__nav">
            <Link to="/camera">Camera</Link>
            <Link to="/senato">Senato</Link>
            <Link to="/metodologia">Metodologia</Link>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>© {currentYear} Fedina Parlamentare</p>

          <p>
            Le informazioni pubblicate devono essere consultate insieme alle
            relative fonti.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
