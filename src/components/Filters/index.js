import React, { useState, useContext } from 'react';
import PlanetsContext from '../../contexts/PlanetsContext';

const Filters = () => {
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparision, setSelectedComparision] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const {
    filterByNumericValues,
    setFilterPlanetsByName,
    addNumericFilter,
    removeFilter,
  } = useContext(PlanetsContext);

  const columns = [
    'population',
    'rotation_period',
    'orbital_period',
    'diameter',
    'surface_water',
  ].filter((column) => !appliedFilters.includes(column));

  const handleClick = () => {
    addNumericFilter({
      column: selectedColumn,
      comparision: selectedComparision,
      value: filterValue,
    });

    setAppliedFilters(filterByNumericValues.map((filter) => filter.column));
  };

  return (
    <>
      <h2>Filters</h2>
      <div className="filters">
        <div className="name-filter">
          <label htmlFor="name-filter">
            Filter by name:
            <input
              data-testid="name-filter"
              id="name-filter"
              onChange={ ({ target: { value } }) => setFilterPlanetsByName(value) }
              type="text"
            />
          </label>
        </div>
        <div className="column-filter">
          <select
            data-testid="column-filter"
            onChange={ ({ target: { value } }) => setSelectedColumn(value) }
            value={ selectedColumn }
          >
            { columns.map((column) => (
              <option key={ column } value={ column }>{ column }</option>
            )) }
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ ({ target: { value } }) => setSelectedComparision(value) }
            value={ selectedComparision }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            data-testid="value-filter"
            onChange={ ({ target: { value } }) => setFilterValue(value) }
            type="number"
            value={ filterValue }
          />
          <button
            data-testid="button-filter"
            onClick={ handleClick }
            type="button"
          >
            Filtrar
          </button>
          <div className="filters-list">
            <ul>
              { filterByNumericValues.map((filter) => (
                <li
                  data-testid="filter"
                  key={ filter.column }
                >
                  { filter.column }
                  <button
                    onClick={ () => removeFilter(filter) }
                    type="button"
                  >
                    X
                  </button>
                </li>
              )) }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
