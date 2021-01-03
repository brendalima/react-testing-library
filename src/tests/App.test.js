import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('nav bar contains a certain group of links', () => {
  const { getByText } = renderWithRouter(<App />);

  const firstLink = getByText('Home');
  const secondLink = getByText('About');
  const thirdLink = getByText('Favorite Pokémons');
  expect(firstLink).toBeInTheDocument();
  expect(secondLink).toBeInTheDocument();
  expect(thirdLink).toBeInTheDocument();
});

test('redirects to Home when clicking Home link in navbar', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
});

test('redirects to About page when clicking About link in navbar', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
});

test('redirects to favorites page when clicking Favorite Pokémons link in navbar', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
});
