import { Link, NavLink } from "react-router-dom";

import "../styles/header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand">
            <img
              src="/fedina-parlamentare-logo.png"
              alt="Fedina Parlamentare"
              className="site-header__logo"
            />

            <span className="site-header__title">Fedina Parlamentare</span>
          </Link>

          <nav className="site-header__nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `site-header__link ${
                  isActive ? "site-header__link--active" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/camera"
              className={({ isActive }) =>
                `site-header__link ${
                  isActive ? "site-header__link--active" : ""
                }`
              }
            >
              Camera
            </NavLink>

            <NavLink
              to="/senato"
              className={({ isActive }) =>
                `site-header__link ${
                  isActive ? "site-header__link--active" : ""
                }`
              }
            >
              Senato
            </NavLink>

            <NavLink
              to="/metodologia"
              className={({ isActive }) =>
                `site-header__link ${
                  isActive ? "site-header__link--active" : ""
                }`
              }
            >
              Metodologia
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
