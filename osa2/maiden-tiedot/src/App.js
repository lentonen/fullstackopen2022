import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({setSearch}) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>find countries <input onChange={handleSearchChange}/></div>
  ) 
}

const Languages = ({country}) => {
  return (
    <div>
      <ul>
        {Object.values(country.languages).map(language =>
        <li key = {language}>{language}</li>
        )}
      </ul>
    </div>
  )
}

const Flag = ({country}) => {
  const src = country.flags.png
  console.log(src)
  return <div><img src={src}/></div>
}

const Results = ({countries, search}) => {
  const countriesToShow = countries.filter(country => country.name.common.toString().toLowerCase().includes(search.toLowerCase()))
  if (countriesToShow.length > 10) {
      return (
        <div>
          Too many matches, spesify another filter
        </div>
      )
  }
  else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country =>
          <p key={country.name.common}>{country.name.common}</p>
        )}
      </div>
    )
  }
  else {
    return (
      <div>
        {countriesToShow.map(country => 
          <div key={country.name.common}>
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h4>Languages</h4>
            <Languages country={country}/>
            <Flag country = {country} />
          </div>
        )}
      </div>
    )  
  }
}

function App() {
// Tilat
const [countries, setCountries] = useState([])
const [search, setSearch] = useState('')

// effect-hook maiden hakemiseen palvelimelta
useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
}, [])

  return (
    <div>
      <h1>Country finder</h1>
      <Search setSearch = {setSearch} />
      <h2>Results</h2>
      <Results countries = {countries} search={search}/>
    </div>
  );
}

export default App;
