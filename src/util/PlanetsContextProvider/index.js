import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../../contexts/PlanetsContext';
import getPlanets from '../../services/planetsAPI';

const PlanetsContextProvider = (props) => {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);

  const setFilterPlanetsByName = (string) => setName(string);
  const addNumericFilter = (filter) => setNumericFilters([...numericFilters, filter]);

  const loadPlanets = async () => {
    const data = await getPlanets();
    setPlanets(data.results);
  };

  const applyFilters = useCallback(() => {
    numericFilters.forEach((filter) => {
      setPlanets(planets.filter((planet) => {
        if (filter
          .comparision === 'maior que') return planet[filter.column] > filter.value;
        if (filter
          .comparision === 'menor que') return planet[filter.column] < filter.value;
        return planet[filter.column] === filter.value;
      }));
    });
  }, [numericFilters, planets]);

  const removeFilter = (selected) => setNumericFilters(numericFilters
    .filter((filter) => filter.column !== selected.column));

  useEffect(() => {
    loadPlanets();
  }, []);

  const { children } = props;
  const contextValues = {
    data: planets,
    filterByName: { name },
    filterByNumericValues: numericFilters,
    setFilterPlanetsByName,
    addNumericFilter,
    removeFilter,
  };

  return (
    <PlanetsContext.Provider value={ contextValues }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsContextProvider;
