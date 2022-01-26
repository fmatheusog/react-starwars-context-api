import React, { useState, useEffect } from 'react';
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
