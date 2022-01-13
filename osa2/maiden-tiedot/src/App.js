import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Komponentti hakukentälle
const Search = ({setSearch}) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>find countries <input onChange={handleSearchChange}/></div>
  ) 
}

// Komponentti maassa puhuttujen kielien näyttämiseen
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

// Komponentti maan lipun näyttämistä varten
const Flag = ({country}) => {
  const src = country.flags.png
  console.log(src)
  return <div><img src={src}/></div>
}

// Painike -komponentti
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// Komponentti joka näyttää listan annetuista maista
const CountryList = ({countriesToShow, handleShow}) => (
  <div>
    {countriesToShow.map(country =>
      <p key={country.name.common}>{country.name.common} <Button handleClick={() => handleShow(country.name.common)} text="show"></Button></p>
    )}
  </div>
)

// Komponentti yksittäisen maan tietojen näyttämiseen
const SingleCountry = ({countriesToShow}) => (
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

/* Komponentti hakutulosten näyttämiseen
 * Jos löydetään yli 10 maata, näytetään varoitusteksti "too many countries..."
 * Jos löydetään 2-10 maata, näytetään lista
 * Jos löydetään 1 maa, näytetään tarkemmat tiedot
 */
const Results = ({countries, search, handleShow}) => {
  const countriesToShow = countries.filter(country => country.name.common.toString().toLowerCase().includes(search.toLowerCase()))
  if (countriesToShow.length > 10) {
      return (
        <div>
          Too many matches, spesify another filter
        </div>
      )
  }
  else if (countriesToShow.length > 1) 
    return <CountryList countriesToShow={countriesToShow} handleShow ={handleShow} />
  else 
    return <SingleCountry countriesToShow={countriesToShow} />
}

function App() {
// Tilat
const [countries, setCountries] = useState([])
const [search, setSearch] = useState('')

// Käsittelee "show"-napin painamisen
const handleShow = (name) => setSearch(name) 
  

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
      <Results countries = {countries} search={search} handleShow={handleShow}/>
    </div>
  );
}

export default App;
