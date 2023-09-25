import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { fetchData } from './helpers/mockData';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => fetchData,
  } as Response;

  const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('se aparece o heading', () => {
  render(<App />);
  const headingEl = screen.getByRole('heading', {
    name: /projeto star wars/i
  })

  expect(headingEl).toBeInTheDocument();
});

test('se aparece o input de filtro por nome', async () => {
  render(<App />);

  const inputEl = screen.getByRole('textbox')

  expect(inputEl).toBeInTheDocument();

  expect(inputEl).toHaveAttribute('name', 'text')

  expect(inputEl).toHaveAttribute('type', 'text')

  expect(inputEl).toHaveAttribute('id', 'text')

  expect(inputEl).toHaveAttribute('data-testid', 'name-filter')

  expect(inputEl).toHaveValue('')

  await userEvent.type(inputEl, 'Tatooine')

  expect(inputEl).toHaveValue('Tatooine')

  const tatooine = await screen.findByRole('cell', {
    name: /tatooine/i
  })

  expect(tatooine).toBeInTheDocument()
} );

test('filtros de comparação maior que', async () => {
  render(<App />);

  const coluna = screen.getByTestId('column-filter')
  const operador = screen.getByLabelText(/operador/i)
  const valor = screen.getByTestId('value-filter')
  const filtrar = screen.getByRole('button', {
    name: /filtrar/i
  })

  await userEvent.selectOptions(coluna, 'population')
  await userEvent.selectOptions(operador, 'maior que')
  await userEvent.type(valor, '1000000')
  await userEvent.click(filtrar)

  screen.debug()

  const kamino = await screen.findByRole('cell', {
    name: /kamino/i
  })

  expect(kamino).toBeInTheDocument()

  const apagarFiltro = screen.getByRole('button', {
    name: /apagar/i
  })

  await userEvent.click(apagarFiltro)

  const tatooine = await screen.findByRole('cell', {
    name: /tatooine/i
  })

  expect(tatooine).toBeInTheDocument()

  await userEvent.selectOptions(coluna, 'population')
  await userEvent.selectOptions(operador, 'maior que')
  await userEvent.type(valor, '1000000')
  await userEvent.click(filtrar)

  const deletarTodosFiltros = screen.getByRole('button', {
    name: /deletar todos filtros/i
  })

  await userEvent.click(deletarTodosFiltros)

  const coruscant = await screen.findByRole('cell', {
    name: /coruscant/i
  })

  expect(coruscant).toBeInTheDocument()
})

test('filtros de comparação menor que', async () => {
  render(<App />);

  const coluna = screen.getByTestId('column-filter')
  const operador = screen.getByLabelText(/operador/i)
  const valor = screen.getByTestId('value-filter')
  const filtrar = screen.getByRole('button', {
    name: /filtrar/i
  })

  await userEvent.selectOptions(coluna, 'orbital_period')
  await userEvent.selectOptions(operador, 'menor que')
  await userEvent.type(valor, '400')

  await userEvent.click(filtrar)

  const tatooine = await screen.findByRole('cell', {
    name: /tatooine/i
  })

  expect(tatooine).toBeInTheDocument()
})

test('filtros de comparação igual a', async () => {
  render(<App />);

  const coluna = screen.getByTestId('column-filter')
  const operador = screen.getByLabelText(/operador/i)
  const valor = screen.getByTestId('value-filter')
  const filtrar = screen.getByRole('button', {
    name: /filtrar/i
  })

  await userEvent.selectOptions(coluna, 'diameter')
  await userEvent.selectOptions(operador, 'igual a')
  await userEvent.type(valor, '19720')

  await userEvent.click(filtrar)

  const kamino = await screen.findByRole('cell', {
    name: /kamino/i
  })

  expect(kamino).toBeInTheDocument()
}
);

test('filtro de comparação rotation_period', async () => {
  render(<App />);

  const coluna = screen.getByTestId('column-filter')
  const operador = screen.getByLabelText(/operador/i)
  const valor = screen.getByTestId('value-filter')
  const filtrar = screen.getByRole('button', {
    name: /filtrar/i
  })

  await userEvent.selectOptions(coluna, 'rotation_period')
  await userEvent.selectOptions(operador, 'igual a')
  await userEvent.type(valor, '27')

  await userEvent.click(filtrar)

  const kamino = await screen.findByRole('cell', {
    name: /kamino/i
  })

  expect(kamino).toBeInTheDocument()
} );

test('filtro de comparação surface_water', async () => {
  render(<App />);

  const coluna = screen.getByTestId('column-filter')
  const operador = screen.getByLabelText(/operador/i)
  const valor = screen.getByTestId('value-filter')
  const filtrar = screen.getByRole('button', {
    name: /filtrar/i
  })

  await userEvent.selectOptions(coluna, 'surface_water')
  await userEvent.selectOptions(operador, 'igual a')
  await userEvent.type(valor, '100')

  await userEvent.click(filtrar)

  const kamino = await screen.findByRole('cell', {
    name: /kamino/i
  })

  expect(kamino).toBeInTheDocument()
} );
