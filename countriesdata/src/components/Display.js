import CountryDetail from './CountryDetail';
import Show from './Show';

const Display = ({countries}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>
  }

  if (countries.length === 1) {
    const country = countries[0];
    return <CountryDetail country={country} />
  }

  return (
    countries.map(country =>
      <div key={country.name.common}>
        {country.name.common}
        <Show country={country} />
      </div>
    )
  );
}

export default Display;