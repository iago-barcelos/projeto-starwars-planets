import { createContext } from 'react';

import { PlanetType } from '../types';

type PlanetsContextType = {
  planets: PlanetType[],
  filteredPlanets: PlanetType[],
  setNameFilter: (name: string) => void,
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
