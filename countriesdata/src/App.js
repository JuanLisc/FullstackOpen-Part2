import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Filter from './components/Filter';
import Display from './components/Display';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(initialCountries =>
        setCountries(initialCountries)
      );
  }, []);

  const handleFilter = (event) => { 
    setFilter(event.target.value);
  };

  console.log('PAISES ANTES DE FILTRO: ', countries[0]);
  /* const countriesToShow = countries.filter(country => {
        country.name.common
          .toLowerCase()
          .includes(filter.toLowerCase())
        || country.name.official
            .toLowerCase()
            .includes(filter.toLowerCase())
      }); */

  const countriesToShow = filter === ''
    ? []
    : countries.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(filter.toLowerCase())
        || country.name.official
            .toLowerCase()
            .includes(filter.toLowerCase())
      )

  console.log('Paises: ', countriesToShow);

  if (!countries) {
    return null
  }
  return (
    <>
    <h1>Countries Information</h1>
    <Filter filter={filter} handleFilter={handleFilter} />
    <Display countries={countriesToShow} />
    </>
  )
}

export default App;
