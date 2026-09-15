import { useNavigate } from "react-router-dom";

import "../styles/chamber-hemicycle.css";

const partyColors = {
  PD: "#d94b4b",
  FDI: "#213a75",
  M5S: "#e0b62d",
  FI: "#4b74c9",
  LEGA: "#4a9f65",
  AVS: "#6aaa55",
};

const statusColors = {
  clean: "#3a9d67",
  investigated: "#d79a27",
  charged: "#d79a27",
  trial: "#d79a27",
  "convicted-non-final": "#c76b35",
  "convicted-final": "#b53d3d",
  acquitted: "#71819b",
  archived: "#71819b",
};

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
      return statusColors[politician.judicialStatus] ?? "#8b92a0";
    }

    return partyColors[politician.party.acronym] ?? "#8b92a0";
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
                  {politician.firstName} {politician.lastName} —{" "}
                  {politician.party.acronym}
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
