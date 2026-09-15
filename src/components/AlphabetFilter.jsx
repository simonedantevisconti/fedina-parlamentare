import "../styles/alphabet-filter.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AlphabetFilter = ({
  selectedLetter,
  onSelect,
  availableLetters = [],
}) => {
  return (
    <div className="alphabet-filter">
      <button
        type="button"
        className={`alphabet-filter__button ${
          selectedLetter === "" ? "alphabet-filter__button--active" : ""
        }`}
        onClick={() => onSelect("")}
      >
        Tutti
      </button>

      {letters.map((letter) => {
        const isAvailable = availableLetters.includes(letter);

        return (
          <button
            key={letter}
            type="button"
            disabled={!isAvailable}
            className={`alphabet-filter__button ${
              selectedLetter === letter ? "alphabet-filter__button--active" : ""
            }`}
            onClick={() => onSelect(letter)}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default AlphabetFilter;
