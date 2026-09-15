import { Link } from "react-router-dom";

import "../styles/politician-card.css";

const statusLabels = {
  clean: "Nessun procedimento noto",
  investigated: "Indagato",
  charged: "Imputato",
  trial: "Processo in corso",
  "convicted-non-final": "Condanna non definitiva",
  "convicted-final": "Condanna definitiva",
  acquitted: "Assolto",
  archived: "Procedimento archiviato",
};

const PoliticianCard = ({ politician }) => {
  const fullName = `${politician.firstName} ${politician.lastName}`;

  return (
    <Link to={`/politico/${politician.id}`} className="politician-card">
      <div className="politician-card__photo-wrapper">
        <img
          src={politician.photo}
          alt={fullName}
          className="politician-card__photo"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="politician-card__photo-fallback">
          <span>
            {politician.firstName.charAt(0)}
            {politician.lastName.charAt(0)}
          </span>
        </div>
      </div>

      <div className="politician-card__content">
        <div className="politician-card__header">
          <div>
            <p className="politician-card__role">Deputato</p>

            <h2>{fullName}</h2>
          </div>

          <span className="politician-card__party">
            {politician.party.acronym}
          </span>
        </div>

        <div className="politician-card__details">
          <div>
            <span>Partito</span>
            <strong>{politician.party.name}</strong>
          </div>

          <div>
            <span>Legislatura</span>
            <strong>{politician.legislature}</strong>
          </div>

          <div>
            <span>Mandato</span>
            <strong>{politician.mandateNumber}</strong>
          </div>
        </div>

        <div
          className={`politician-card__status politician-card__status--${politician.judicialStatus}`}
        >
          <span className="politician-card__status-dot"></span>

          {statusLabels[politician.judicialStatus]}
        </div>
      </div>
    </Link>
  );
};

export default PoliticianCard;
