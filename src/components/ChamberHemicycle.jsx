import { useNavigate } from "react-router-dom";

import { getJudicialStatus } from "../data/judicialStatuses";
import { getParty } from "../data/parties";

import "../styles/chamber-hemicycle.css";

const ChamberHemicycle = ({ politicians, mode = "party" }) => {
  const navigate = useNavigate();

  const width = 1000;
  const height = 540;

  const centerX = width / 2;
  const centerY = height - 30;

  const rows = 6;

  const groupedRows = Array.from({ length: rows }, () => []);

  politicians.forEach((politician, index) => {
    groupedRows[index % rows].push(politician);
  });

  const getColor = (politician) => {
    if (mode === "status") {
      return getJudicialStatus(politician.judicialStatus).color;
    }

    return getParty(politician.party.acronym).color;
  };

  return (
    <div className="chamber-hemicycle">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="chamber-hemicycle__svg"
        role="img"
        aria-label="Rappresentazione semicircolare del Parlamento"
      >
        {groupedRows.map((row, rowIndex) => {
          const radius = 120 + rowIndex * 58;

          return row.map((politician, index) => {
            const total = row.length;

            const startAngle = Math.PI;
            const endAngle = 2 * Math.PI;

            const angle =
              total === 1
                ? Math.PI * 1.5
                : startAngle + (index / (total - 1)) * (endAngle - startAngle);

            const x = centerX + Math.cos(angle) * radius;

            const y = centerY + Math.sin(angle) * radius;

            const fullName = `${politician.firstName} ${politician.lastName}`;

            return (
              <g
                key={politician.id}
                className="chamber-hemicycle__member"
                onClick={() => navigate(`/politico/${politician.id}`)}
                role="button"
                tabIndex="0"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    navigate(`/politico/${politician.id}`);
                  }
                }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill={getColor(politician)}
                  className="chamber-hemicycle__dot"
                />

                <title>
                  {fullName} —{" "}
                  {mode === "status"
                    ? getJudicialStatus(politician.judicialStatus).label
                    : politician.party.acronym}
                </title>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
};

export default ChamberHemicycle;
