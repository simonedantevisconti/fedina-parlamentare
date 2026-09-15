import { useMemo, useState } from "react";

import AlphabetFilter from "../components/AlphabetFilter";
import PoliticianCard from "../components/PoliticianCard";
import PoliticianSearch from "../components/PoliticianSearch";

import politicians from "../data/politicians";

import "../styles/senato.css";

const SenatoPage = () => {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const senators = useMemo(
    () => politicians.filter((politician) => politician.chamber === "senato"),
    [],
  );

  const availableLetters = useMemo(
    () =>
      [
        ...new Set(
          senators.map((politician) =>
            politician.lastName.charAt(0).toUpperCase(),
          ),
        ),
      ].sort(),
    [senators],
  );

  const filteredSenators = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return senators
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
  }, [senators, search, selectedLetter]);

  return (
    <div className="senato-page">
      {/* HERO */}
      <section className="senato-page__hero">
        <div className="container">
          <p className="senato-page__eyebrow">Parlamento Italiano</p>

          <h1>Senato della Repubblica</h1>

          <p className="senato-page__description">
            Consulta i senatori censiti, cerca per nome o cognome e visualizza
            le informazioni relative al mandato e allo stato giudiziario
            registrato.
          </p>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="senato-page__directory">
        <div className="container">
          <div className="senato-page__toolbar">
            <div className="senato-page__search">
              <PoliticianSearch
                value={search}
                onChange={setSearch}
                placeholder="Cerca un senatore per nome o cognome"
              />
            </div>

            <div className="senato-page__count">
              <strong>{filteredSenators.length}</strong>

              <span>
                {filteredSenators.length === 1 ? "senatore" : "senatori"}
              </span>
            </div>
          </div>

          <div className="senato-page__alphabet">
            <p>Filtra per iniziale del cognome</p>

            <AlphabetFilter
              selectedLetter={selectedLetter}
              onSelect={setSelectedLetter}
              availableLetters={availableLetters}
            />
          </div>

          {filteredSenators.length > 0 ? (
            <div className="row g-4">
              {filteredSenators.map((politician) => (
                <div className="col-12 col-md-6 col-xl-4" key={politician.id}>
                  <PoliticianCard politician={politician} />
                </div>
              ))}
            </div>
          ) : (
            <div className="senato-page__empty">
              <h2>Nessun senatore trovato</h2>

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

export default SenatoPage;
