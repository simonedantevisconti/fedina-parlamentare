import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getJudicialStatus } from "../data/judicialStatuses";
import { getParty } from "../data/parties";

import "../styles/chamber-hemicycle.css";

const ChamberHemicycle = ({ politicians, mode = "party" }) => {
  const navigate = useNavigate();
  const [hoveredMember, setHoveredMember] = useState(null);

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

  const formatName = (value) =>
    value
      .toLocaleLowerCase("it-IT")
      .replace(/(^|[\s'’-])\p{L}/gu, (match) => match.toLocaleUpperCase("it-IT"));

  const showPointerCard = (event, politician) => {
    const canvas = event.currentTarget.closest(".chamber-hemicycle__canvas");

    if (!canvas) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();

    const y = event.clientY - bounds.top;
    const pointerX = event.clientX - bounds.left + canvas.scrollLeft;
    const x = Math.min(
      Math.max(pointerX, canvas.scrollLeft + 128),
      canvas.scrollLeft + canvas.clientWidth - 128,
    );

    setHoveredMember({
      politician,
      x,
      y,
      placement: y < 125 ? "below" : "above",
    });
  };

  const showKeyboardCard = (event, politician) => {
    const canvas = event.currentTarget.closest(".chamber-hemicycle__canvas");

    if (!canvas) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const memberBounds = event.currentTarget.getBoundingClientRect();

    const y = memberBounds.top - bounds.top;
    const memberX =
      memberBounds.left + memberBounds.width / 2 - bounds.left + canvas.scrollLeft;
    const x = Math.min(
      Math.max(memberX, canvas.scrollLeft + 128),
      canvas.scrollLeft + canvas.clientWidth - 128,
    );

    setHoveredMember({
      politician,
      x,
      y,
      placement: y < 125 ? "below" : "above",
    });
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
              onPointerEnter={(event) => showPointerCard(event, politician)}
              onPointerMove={(event) => showPointerCard(event, politician)}
              onPointerLeave={() => setHoveredMember(null)}
              onFocus={(event) => showKeyboardCard(event, politician)}
              onBlur={() => setHoveredMember(null)}
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
            </g>
          ))}
        </svg>

        {hoveredMember && (
          <div
            className="chamber-hemicycle__tooltip"
            style={{
              "--tooltip-x": `${hoveredMember.x}px`,
              "--tooltip-y": `${hoveredMember.y}px`,
            }}
            data-placement={hoveredMember.placement}
            role="presentation"
          >
            <div className="chamber-hemicycle__tooltip-photo">
              <span aria-hidden="true">
                {hoveredMember.politician.firstName.charAt(0)}
                {hoveredMember.politician.lastName.charAt(0)}
              </span>

              <img
                key={hoveredMember.politician.id}
                src={hoveredMember.politician.photo}
                alt=""
                decoding="async"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="chamber-hemicycle__tooltip-content">
              <strong>
                {formatName(
                  `${hoveredMember.politician.firstName} ${hoveredMember.politician.lastName}`,
                )}
              </strong>

              <span>{hoveredMember.politician.party.acronym.toUpperCase()}</span>
            </div>
          </div>
        )}
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
