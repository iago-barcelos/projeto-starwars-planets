import { createContext } from 'react';

import { FormValuesType, PlanetType } from '../types';

type PlanetsContextType = {
  planets: PlanetType[],
  filteredPlanets: PlanetType[],
  setNameFilter: (name: string) => void,
  setFilteredPlanets: (planets: PlanetType[]) => void,
  setColumnFilter: React.Dispatch<React.SetStateAction<FormValuesType[] | undefined>>,
  columnFilter: FormValuesType[] | undefined,
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
