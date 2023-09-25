import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetContext';
import useFormValues from '../hooks/useFormValues';
import { FormValuesType } from '../types';
import Table from './Table';

interface PlanetSortType {
  population: string;
  orbital_period: string;
  diameter: string;
  rotation_period: string;
  surface_water: string;
}

const INITIAL_VALUES = {
  column: 'population',
  comparison: 'maior que',
  valueFilter: 0,
};

const INITIAL_ORDENAR_VALUES = {
  columnSort: 'population',
  sort: 'ASC',
};

type OrdenarFormValuesType = {
  columnSort: string;
  sort: string;
};

function PlanetsTableList() {
  const planetsContext = useContext(PlanetsContext);
  const {
    setNameFilter,
    filteredPlanets,
    setFilteredPlanets,
    setColumnFilter,
    columnFilter,
  } = planetsContext;
  const [
    values,
    handleChange,
    resetForm,
  ] = useFormValues(INITIAL_VALUES as FormValuesType);
  const [
    ordenarValues,
    handleOrdenarChange,
  ] = useFormValues(INITIAL_ORDENAR_VALUES as OrdenarFormValuesType);

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNameFilter(value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setColumnFilter([
      ...columnFilter || [],
      values,
    ]);
    resetForm();
  };

  const handleOrdenarSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFilteredPlanets = [...filteredPlanets];

    newFilteredPlanets.sort((a: PlanetSortType, b: PlanetSortType) => {
      const column = ordenarValues.columnSort as keyof PlanetSortType;
      if (a[column] === 'unknown') return 1;
      if (b[column] === 'unknown') return -1;
      if (ordenarValues.sort === 'DESC') {
        return Number(b[column]) - Number(a[column]);
      }
      return Number(a[column]) - Number(b[column]);
    });
    setFilteredPlanets(newFilteredPlanets);
  };

  const handleDeleteFilter = (column: string) => {
    const newColumnFilter = columnFilter?.filter((c) => c.column !== column);
    setColumnFilter(newColumnFilter);
  };

  const handleDeleteAllFilters = () => {
    setColumnFilter([]);
  };

  return (
    <>
      <div>
        <input
          data-testid="name-filter"
          id="text"
          name="text"
          onChange={ handleTextInputChange }
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
            {!columnFilter?.find((c) => c.column === 'population')
              && <option value="population">population</option>}
            {!columnFilter?.find((c) => c.column === 'orbital_period')
              && <option value="orbital_period">orbital_period</option>}
            {!columnFilter?.find((c) => c.column === 'diameter')
              && <option value="diameter">diameter</option>}
            {!columnFilter?.find((c) => c.column === 'rotation_period')
              && <option value="rotation_period">rotation_period</option>}
            {!columnFilter?.find((c) => c.column === 'surface_water')
              && <option value="surface_water">surface_water</option>}
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
      <form action="" onSubmit={ handleOrdenarSubmit }>
        <label htmlFor="column-sort">
          Ordenar
          <select
            id="column-sort"
            name="columnSort"
            data-testid="column-sort"
            value={ ordenarValues.columnSort }
            onChange={ handleOrdenarChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            name="sort"
            id="ASC"
            value="ASC"
            checked={ ordenarValues.sort === 'ASC' }
            onChange={ handleOrdenarChange }
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            name="sort"
            id="DESC"
            value="DESC"
            data-testid="column-sort-input-desc"
            checked={ ordenarValues.sort === 'DESC' }
            onChange={ handleOrdenarChange }
          />
        </label>
        <button type="submit" data-testid="column-sort-button">Ordenar</button>
      </form>
      <div>
        {columnFilter?.map((c) => (
          <div key={ c.column } data-testid="filter">
            <span>
              {c.column}
              {' '}
            </span>
            <span>
              {c.comparison}
              {' '}
            </span>
            <span>{c.valueFilter}</span>
            <button
              onClick={ () => handleDeleteFilter(c.column) }
            >
              Apagar
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={ handleDeleteAllFilters }
          data-testid="button-remove-filters"
        >
          Deletar Todos Filtros
        </button>
      </div>
      <Table />
    </>
  );
}

export default PlanetsTableList;
