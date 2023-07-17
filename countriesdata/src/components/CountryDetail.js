const CountryDetail = ({country}) => {
  const flag = country.flags.png;
  const languages = [];
    for (let language in country.languages) {
      languages.push(country.languages[language]);
    }

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map(language => 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img alt='Flag' src={flag} />
    </>
  );
}

export default CountryDetail;