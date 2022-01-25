import React, { useContext } from 'react';
import PlanetsContext from '../../contexts/PlanetsContext';

const PlanetsTable = () => {
  const { data } = useContext(PlanetsContext);
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          {/* <th /> */}
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* <td /> */}
        </tr>
      </tbody>
    </table>
  );
};

export default PlanetsTable;
