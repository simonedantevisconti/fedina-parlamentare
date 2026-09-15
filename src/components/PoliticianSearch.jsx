import "../styles/politician-search.css";

const PoliticianSearch = ({
  value,
  onChange,
  placeholder = "Cerca per nome o cognome",
}) => {
  return (
    <div className="politician-search">
      <div className="politician-search__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="11"
            cy="11"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          <path
            d="M16 16L21 21"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="politician-search__input"
        aria-label={placeholder}
      />

      {value && (
        <button
          type="button"
          className="politician-search__clear"
          onClick={() => onChange("")}
          aria-label="Cancella ricerca"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default PoliticianSearch;
