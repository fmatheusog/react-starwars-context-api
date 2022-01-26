import React from 'react';
import './App.css';
import PlanetsContextProvider from './util/PlanetsContextProvider';
import PlanetsTable from './components/PlanetsTable';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsContextProvider>
      <Filters />
      <PlanetsTable />
    </PlanetsContextProvider>
  );
}

export default App;
