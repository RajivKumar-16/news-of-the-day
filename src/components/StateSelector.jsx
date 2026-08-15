import { useState } from "react";

function StateSelector({
  selectedState,
  states,
  onStateChange,
  loading,
}) {
  const [search, setSearch] = useState("");

  const filteredStates = states.filter((state) =>
    state
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSelect = (event) => {
    onStateChange(event.target.value);
    setSearch("");
  };

  return (
    <section className="state-selector">
      <div className="selector-title">
        <span className="section-kicker">
          EXPLORE
        </span>

        <h3>
          Looking for another state?
        </h3>
      </div>

      <div className="selector-controls">
        <div className="state-search">
          <span className="search-icon">
            /
          </span>

          <input
            type="text"
            placeholder="Search a state..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={selectedState}
          onChange={handleSelect}
          disabled={loading}
          className="state-dropdown"
        >
          <option value="India">
            All India
          </option>

          <optgroup label="States & Union Territories">
            {filteredStates.map((state) => (
              <option
                value={state}
                key={state}
              >
                {state}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </section>
  );
}

export default StateSelector;