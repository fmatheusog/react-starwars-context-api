import React from 'react';
import './App.css';
import PlanetsContextProvider from './util/PlanetsContextProvider';
import Header from './components/Header';
import PlanetsTable from './components/PlanetsTable';
import Filters from './components/Filters';

function App() {
  return (
    <>
      <Header />
      <PlanetsContextProvider>
        <Filters />
        <PlanetsTable />
      </PlanetsContextProvider>
    </>
  );
}

export default App;
