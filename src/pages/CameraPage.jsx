import { useMemo, useState } from "react";

import AlphabetFilter from "../components/AlphabetFilter";
import ChamberHemicycle from "../components/ChamberHemicycle";
import PoliticianCard from "../components/PoliticianCard";
import PoliticianSearch from "../components/PoliticianSearch";

import politicians from "../data/politicians";

import "../styles/camera.css";

const CameraPage = () => {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const deputies = useMemo(
    () => politicians.filter((politician) => politician.chamber === "camera"),
    [],
  );

  const availableLetters = useMemo(
    () =>
      [
        ...new Set(
          deputies.map((politician) =>
            politician.lastName.charAt(0).toUpperCase(),
          ),
        ),
      ].sort(),
    [deputies],
  );

  const filteredDeputies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return deputies
      .filter((politician) => {
        const fullName =
          `${politician.firstName} ${politician.lastName}`.toLowerCase();

        return fullName.includes(normalizedSearch);
      })
      .filter((politician) => {
        if (!selectedLetter) {
          return true;
        }

        return politician.lastName.charAt(0).toUpperCase() === selectedLetter;
      })
      .sort((a, b) => a.lastName.localeCompare(b.lastName, "it"));
  }, [deputies, search, selectedLetter]);

  return (
    <div className="camera-page">
      {/* HERO */}
      <section className="camera-page__hero">
        <div className="container">
          <p className="camera-page__eyebrow">Parlamento Italiano</p>

          <h1>Camera dei Deputati</h1>

          <p className="camera-page__description">
            Consulta i deputati censiti, cerca per nome o cognome e visualizza
            le informazioni relative al mandato e allo stato giudiziario
            registrato.
          </p>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="camera-page__directory">
        <div className="container">
          {/* SEARCH */}
          <div className="camera-page__toolbar">
            <div className="camera-page__search">
              <PoliticianSearch
                value={search}
                onChange={setSearch}
                placeholder="Cerca un deputato per nome o cognome"
              />
            </div>

            <div className="camera-page__count">
              <strong>{filteredDeputies.length}</strong>

              <span>
                {filteredDeputies.length === 1 ? "deputato" : "deputati"}
              </span>
            </div>
          </div>

          {/* EMICICLO */}
          <div className="camera-page__hemicycle">
            <div className="camera-page__hemicycle-heading">
              <div>
                <p>Composizione della Camera</p>

                <h2>Emiciclo</h2>
              </div>

              <span>{deputies.length} deputati</span>
            </div>

            <ChamberHemicycle politicians={deputies} mode="party" />
          </div>

          {/* FILTRO ALFABETICO */}
          <div className="camera-page__alphabet">
            <p>Filtra per iniziale del cognome</p>

            <AlphabetFilter
              selectedLetter={selectedLetter}
              onSelect={setSelectedLetter}
              availableLetters={availableLetters}
            />
          </div>

          {/* CARDS */}
          {filteredDeputies.length > 0 ? (
            <div className="row g-4">
              {filteredDeputies.map((politician) => (
                <div className="col-12 col-md-6 col-xl-4" key={politician.id}>
                  <PoliticianCard politician={politician} />
                </div>
              ))}
            </div>
          ) : (
            <div className="camera-page__empty">
              <h2>Nessun deputato trovato</h2>

              <p>
                Prova a modificare il nome cercato oppure il filtro alfabetico
                selezionato.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedLetter("");
                }}
              >
                Azzera i filtri
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CameraPage;
