export const fetcher = url => fetch(url).then(r => r.json())
export const urlRestCountries = 'https://restcountries.eu/rest/v2/all'