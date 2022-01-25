import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../../contexts/PlanetsContext';
import getPlanets from '../../services/planetsAPI';

const PlanetsContextProvider = (props) => {
  const [planets, setPlanets] = useState({});

  const loadPlanets = async () => {
    const data = await getPlanets();
    setPlanets(data.results);
  };

  useEffect(() => {
    loadPlanets();
  }, []);

  const { children } = props;
  return (
    <PlanetsContext.Provider value={ { data: planets } }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsContextProvider.contextType = PlanetsContext;

PlanetsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsContextProvider;
