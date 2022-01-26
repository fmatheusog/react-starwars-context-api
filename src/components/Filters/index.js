import React, { useContext } from 'react';
import PlanetsContext from '../../contexts/PlanetsContext';

const Filters = () => {
  const { filterPlanetsByName } = useContext(PlanetsContext);
  return (
    <>
      <h2>Filtros</h2>
      <label htmlFor="name-filter">
        Filtrar por nome:
        <input
          data-testid="name-filter"
          id="name-filter"
          onChange={ ({ target: { value } }) => filterPlanetsByName(value) }
          type="text"
        />
      </label>
    </>
  );
};

export default Filters;
