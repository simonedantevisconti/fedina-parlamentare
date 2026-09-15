import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getJudicialStatus } from "../data/judicialStatuses";
import { getParty } from "../data/parties";

import "../styles/chamber-hemicycle.css";

const ChamberHemicycle = ({ politicians, mode = "party" }) => {
  const navigate = useNavigate();

  const width = 1200;
  const height = 680;

  const centerX = width / 2;
  const centerY = height - 45;

  const processedPoliticians = useMemo(() => {
    return [...politicians].sort((a, b) => {
      if (mode === "party") {
        const partyComparison = a.party.acronym.localeCompare(
          b.party.acronym,
          "it",
        );

        if (partyComparison !== 0) {
          return partyComparison;
        }
      }

      if (mode === "status") {
        const statusComparison = a.judicialStatus.localeCompare(
          b.judicialStatus,
          "it",
        );

        if (statusComparison !== 0) {
          return statusComparison;
        }
      }

      return a.lastName.localeCompare(b.lastName, "it");
    });
  }, [politicians, mode]);

  const seats = useMemo(() => {
    if (processedPoliticians.length === 0) {
      return [];
    }

    /*
     * Aumentiamo il numero di file in base
     * alla quantità di parlamentari.
     */
    const rowCount =
      processedPoliticians.length > 300
        ? 10
        : processedPoliticians.length > 180
          ? 9
          : processedPoliticians.length > 100
            ? 8
            : 6;

    const innerRadius = 135;
    const outerRadius = 560;

    const radiusStep =
      rowCount > 1 ? (outerRadius - innerRadius) / (rowCount - 1) : 0;

    /*
     * Ogni fila può contenere più seggi
     * man mano che aumenta il raggio.
     */
    const rowCapacities = Array.from({ length: rowCount }, (_, rowIndex) => {
      const radius = innerRadius + rowIndex * radiusStep;

      return {
        rowIndex,
        radius,
        capacity: Math.max(1, Math.round((Math.PI * radius) / 26)),
      };
    });

    const totalCapacity = rowCapacities.reduce(
      (total, row) => total + row.capacity,
      0,
    );

    /*
     * Ridimensioniamo proporzionalmente
     * le capacità per usare esattamente
     * il numero di parlamentari disponibile.
     */
    const normalizedRows = rowCapacities.map((row) => ({
      ...row,
      capacity: Math.max(
        1,
        Math.round(
          (row.capacity / totalCapacity) * processedPoliticians.length,
        ),
      ),
    }));

    /*
     * Correggiamo eventuali differenze dovute
     * agli arrotondamenti.
     */
    let normalizedTotal = normalizedRows.reduce(
      (total, row) => total + row.capacity,
      0,
    );

    while (normalizedTotal < processedPoliticians.length) {
      normalizedRows[normalizedRows.length - 1].capacity += 1;

      normalizedTotal += 1;
    }

    while (
      normalizedTotal > processedPoliticians.length &&
      normalizedRows.some((row) => row.capacity > 1)
    ) {
      for (let index = normalizedRows.length - 1; index >= 0; index -= 1) {
        if (normalizedRows[index].capacity > 1) {
          normalizedRows[index].capacity -= 1;

          normalizedTotal -= 1;

          break;
        }
      }
    }

    const result = [];

    let politicianIndex = 0;

    normalizedRows.forEach(({ radius, capacity }) => {
      const remaining = processedPoliticians.length - politicianIndex;

      const rowSize = Math.min(capacity, remaining);

      if (rowSize <= 0) {
        return;
      }

      /*
       * Lasciamo un piccolo margine laterale
       * per evitare che i pallini finiscano
       * contro i bordi.
       */
      const startAngle = Math.PI + 0.055;

      const endAngle = 2 * Math.PI - 0.055;

      for (let index = 0; index < rowSize; index += 1) {
        const politician = processedPoliticians[politicianIndex];

        let angle;

        if (rowSize === 1) {
          angle = Math.PI * 1.5;
        } else {
          angle =
            startAngle + (index / (rowSize - 1)) * (endAngle - startAngle);
        }

        const x = centerX + Math.cos(angle) * radius;

        const y = centerY + Math.sin(angle) * radius;

        result.push({
          politician,
          x,
          y,
        });

        politicianIndex += 1;
      }
    });

    return result;
  }, [processedPoliticians, centerX, centerY]);

  const getColor = (politician) => {
    if (mode === "status") {
      return getJudicialStatus(politician.judicialStatus).color;
    }

    return getParty(politician.party.acronym).color;
  };

  const getTitle = (politician) => {
    const fullName = `${politician.firstName} ${politician.lastName}`;

    if (mode === "status") {
      const status = getJudicialStatus(politician.judicialStatus);

      return `${fullName} — ${status.label}`;
    }

    return `${fullName} — ${politician.party.acronym}`;
  };

  const handleOpenPolitician = (politicianId) => {
    navigate(`/politico/${politicianId}`);
  };

  return (
    <div className="chamber-hemicycle">
      <div className="chamber-hemicycle__canvas">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="chamber-hemicycle__svg"
          role="img"
          aria-label="Rappresentazione semicircolare dei parlamentari"
        >
          {/* Fondo leggero dell'emiciclo */}
          <path
            d={`
              M 55 ${centerY}
              A ${centerX - 55} ${centerX - 55}
              0 0 1
              ${width - 55} ${centerY}
            `}
            className="chamber-hemicycle__guide"
          />

          {seats.map(({ politician, x, y }) => (
            <g
              key={politician.id}
              className="chamber-hemicycle__member"
              role="button"
              tabIndex="0"
              aria-label={getTitle(politician)}
              onClick={() => handleOpenPolitician(politician.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();

                  handleOpenPolitician(politician.id);
                }
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="8.5"
                fill={getColor(politician)}
                className="chamber-hemicycle__dot"
              />

              <title>{getTitle(politician)}</title>
            </g>
          ))}
        </svg>
      </div>

      <div className="chamber-hemicycle__footer">
        <span>
          {politicians.length}{" "}
          {politicians.length === 1 ? "parlamentare" : "parlamentari"}
        </span>

        <span>Seleziona un punto per aprire la scheda</span>
      </div>
    </div>
  );
};

export default ChamberHemicycle;
