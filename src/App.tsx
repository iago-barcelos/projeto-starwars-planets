import { useEffect, useState } from 'react';
import './App.css';

import PlanetsContext from './context/PlanetContext';
import { FormValuesType, PlanetType } from './types';
import PlanetsTableList from './components/PlanetsTableList';

const switchCases = (comparison: string, column: string, valueFilter: number) => {
  switch (comparison) {
    case 'maior que':
      return Number(column) > Number(valueFilter);
    case 'menor que':
      return Number(column) < Number(valueFilter);
    case 'igual a':
      return Number(column) === Number(valueFilter);
    default:
      return false;
  }
};

function App() {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [columnFilter, setColumnFilter] = useState<FormValuesType[]>();

  useEffect(() => {
    const filtered = planets.filter((planet) => planet.name.includes(nameFilter))
      .filter((planet) => {
        const pFilter = columnFilter?.find((c) => c.column === 'population');
        if (pFilter) {
          return switchCases(pFilter.comparison, planet.population, pFilter.valueFilter);
        }
        return true;
      }).filter((planet) => {
        const orbPerFilter = columnFilter?.find((c) => c.column === 'orbital_period');
        if (orbPerFilter) {
          return switchCases(
            orbPerFilter.comparison,
            planet.orbital_period,
            orbPerFilter.valueFilter,
          );
        }
        return true;
      }).filter((planet) => {
        const dFilter = columnFilter?.find((c) => c.column === 'diameter');
        if (dFilter) {
          return switchCases(dFilter.comparison, planet.diameter, dFilter.valueFilter);
        }
        return true;
      })
      .filter((planet) => {
        const rotPerFilter = columnFilter?.find((c) => c.column === 'rotation_period');
        if (rotPerFilter) {
          return switchCases(
            rotPerFilter.comparison,
            planet.rotation_period,
            rotPerFilter.valueFilter,
          );
        }
        return true;
      })
      .filter((planet) => {
        const sWaterFilter = columnFilter?.find((c) => c.column === 'surface_water');
        if (sWaterFilter) {
          return switchCases(
            sWaterFilter.comparison,
            planet.surface_water,
            sWaterFilter.valueFilter,
          );
        }
        return true;
      });
  }, [nameFilter, planets, columnFilter]);

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const planetsData = data.results.map((planet: PlanetType) => ({
        name: planet.name,
        climate: planet.climate,
        created: planet.created,
        diameter: planet.diameter,
        edited: planet.edited,
        films: planet.films,
        gravity: planet.gravity,
        orbital_period: planet.orbital_period,
        population: planet.population,
        rotation_period: planet.rotation_period,
        surface_water: planet.surface_water,
        terrain: planet.terrain,
        url: planet.url,
      }));
      setPlanets(planetsData);
    }; fetchPlanetsData();
  }, []);

  return (
    <PlanetsContext.Provider
      value={ {
        columnFilter,
        setColumnFilter,
        filteredPlanets,
        planets,
        setNameFilter,
        setFilteredPlanets,
      } }
    >
      <h1>Projeto Star Wars</h1>
      <PlanetsTableList />
    </PlanetsContext.Provider>
  );
}

export default App;
