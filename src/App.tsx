import React, { useEffect, useState } from 'react';
import './App.css';

import PlanetsContext from './context/PlanetContext';
import { FormValuesType, PlanetType } from './types';
import PlanetsTableList from './components/PlanetsTableList';

const switchCases = (
  comparison: string,
  column: string | string[],
  valueFilter: number,
) => {
  if (Array.isArray(column)) {
    return column.some((value) => {
      if (comparison === 'maior que') {
        return Number(value) > valueFilter;
      }
      if (comparison === 'menor que') {
        return Number(value) < valueFilter;
      }
      if (comparison === 'igual a') {
        return Number(value) === valueFilter;
      }
      return false;
    });
  }
  if (comparison === 'maior que') {
    return Number(column) > valueFilter;
  }
  if (comparison === 'menor que') {
    return Number(column) < valueFilter;
  }
  if (comparison === 'igual a') {
    return Number(column) === valueFilter;
  }
  return false;
};

function App() {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [columnFilter, setColumnFilter] = useState<FormValuesType[]>();

  useEffect(() => {
    const filtered = planets.filter(
      (planet: PlanetType) => planet.name.includes(nameFilter),
    )
      .filter((planet: PlanetType) => (columnFilter ? columnFilter.every((filter) => (
        switchCases(
          filter.comparison,
          planet[filter.column as keyof PlanetType],
          filter.valueFilter,
        )
      )) : true));
    setFilteredPlanets(filtered);
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
    };

    fetchPlanetsData();
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
