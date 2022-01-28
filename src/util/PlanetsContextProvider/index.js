import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../../contexts/PlanetsContext';
import getPlanets from '../../services/planetsAPI';

const PlanetsContextProvider = (props) => {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [name, setName] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);

  const setFilterPlanetsByName = (string) => setName(string);
  const addNumericFilter = (filter) => setNumericFilters([...numericFilters, filter]);

  const loadPlanets = async () => {
    const data = await getPlanets();
    setPlanets(data.results);
  };

  const removeFilter = (selected) => setNumericFilters(numericFilters
    .filter((filter) => filter.column !== selected.column));

  const applyFilter = (filter, array) => array.filter((planet) => {
    if (filter
      .comparision === 'maior que') {
      return planet[filter
        .column] > Number(filter.value);
    }
    if (filter
      .comparision === 'menor que') {
      return planet[filter
        .column] < Number(filter.value);
    }
    return planet[filter.column] === filter.value;
  });

  useEffect(() => {
    loadPlanets();
  }, []);

  useEffect(() => {
    if (numericFilters.length > 0) {
      let filtered = planets;
      numericFilters.forEach((filter) => {
        filtered = applyFilter(filter, filtered);
      });
      setFilteredPlanets(filtered);
    }
  }, [numericFilters, planets]);

  const { children } = props;
  const contextValues = {
    data: numericFilters.length === 0 ? planets : filteredPlanets,
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
