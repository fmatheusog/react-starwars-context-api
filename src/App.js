import React from 'react';
import './App.css';
import PlanetsContextProvider from './util/PlanetsContextProvider';
import PlanetsTable from './components/PlanetsTable';

function App() {
  return (
    <PlanetsContextProvider>
      <PlanetsTable />
    </PlanetsContextProvider>
  );
}

export default App;
