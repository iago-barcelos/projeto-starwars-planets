import { useContext } from 'react';
import PlanetsContext from '../context/PlanetContext';

import useFormValues from '../hooks/useForm';
import { PlanetType } from '../types';

const INITIAL_VALUES = {
  column: 'population',
  comparison: 'maior que',
  valueFilter: 0,
};

type FormValuesType = {
  column: string;
  comparison: string;
  valueFilter: number;
};

function PlanetsTableList() {
  const planetsContext = useContext(PlanetsContext);
  const { setNameFilter, filteredPlanets } = planetsContext;
  const { values, handleChange } = useFormValues(INITIAL_VALUES as FormValuesType);

  const columns: string[] = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNameFilter(value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { column, comparison, valueFilter } = values;
    const filtered = planetsContext.filteredPlanets.filter((planet) => {
      switch (comparison) {
        case 'maior que':
          return Number(planet[column]) > Number(valueFilter);
        case 'menor que':
          return Number(planet[column]) < Number(valueFilter);
        case 'igual a':
          return Number(planet[column]) === Number(valueFilter);
        default:
          return false;
      }
    });
    planetsContext.setFilteredPlanets(filtered);
  };

  return (
    <>
      <div>
        <input
          data-testid="name-filter"
          id="text"
          name="text"
          onChange={ handleInputChange }
          type="text"
        />
      </div>
      <form action="" onSubmit={ handleFormSubmit }>
        <label htmlFor="column">
          Coluna
          <select
            data-testid="column-filter"
            name="column"
            id="column"
            value={ values.column }
            onChange={ handleChange }
          >
            {columns.map((column) => (
              <option key={ column } value={ column }>
                {column}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          Operador
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="comparison"
            value={ values.comparison }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="valueFilter">
          <input
            data-testid="value-filter"
            type="number"
            name="valueFilter"
            id="valueFilter"
            value={ values.valueFilter }
            onChange={ handleChange }
          />
        </label>
        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Rotation Period
            </th>
            <th>
              Orbital Period
            </th>
            <th>
              Diameter
            </th>
            <th>
              Climate
            </th>
            <th>
              Gravity
            </th>
            <th>
              Terrain
            </th>
            <th>
              Surface Water
            </th>
            <th>
              Population
            </th>
            <th>
              Films
            </th>
            <th>
              Created
            </th>
            <th>
              Edited
            </th>
            <th>
              URL
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                {planet.films.map((film) => (
                  <span key={ film }>{film}</span>
                ))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PlanetsTableList;
