import React, { useState, useEffect } from 'react'
import personService from './services/persons'

// Komponentti yksittäisen henkilön tiedoille
const Person = ({person}) => <p key={person.name}>{person.name} {person.number}</p>

// Komponentti filterin perusteella löydettyjen henkilöiden tietojen näyttämiselle
const Persons = ({persons, filter}) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      {personsToShow.map(person => 
        <Person key={person.name} person = {person} />
      )}
    </div>
  )
}

// Komponentti - nimien filtteröinti
const Filter = ({setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>filter shown with <input onChange={handleFilterChange}/></div>
  ) 
}

// Komponentti - lomake nimen ja numeron lisäämiselle
const PersonForm = ({addName, newName, handleNameChange, handleNumberChange, newNumber}) => {
  return (
    <div>
      <form onSubmit={addName}>
        <div>name: <input value = {newName} onChange={handleNameChange}/></div>
        <div>number: <input value = {newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}


const App = () => {
  // Tilat
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  
  // effect-hook henkilöiden hakemiseen palvelimelta
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  // Tapahtumankäsittelijä "name" -kentälle
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Tapahtumankäsittelijä "number" -kentälle
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Lisää uuden henkilön tiedot palvelimelle ja päivittää tilan
  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length === 0) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(personObject))  
        })
      
    }
    else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter setFilter = {setFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App