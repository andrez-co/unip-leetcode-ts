import type { CountryApiItem } from '../types/quiz';

const COUNTRIES_ENDPOINT = 'https://restcountries.com/v3.1/all?fields=name,capital,flags';

export async function fetchCountries(): Promise<CountryApiItem[]> {
  const response = await fetch(COUNTRIES_ENDPOINT);

  if (!response.ok) {
    throw new Error('No se pudieron cargar los paises para el quiz.');
  }

  return response.json() as Promise<CountryApiItem[]>;
}
