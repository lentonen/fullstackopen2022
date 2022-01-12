import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => <p key={person.name}>{person.name} {person.number}</p>


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


const Filter = ({setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>filter shown with <input onChange={handleFilterChange}/></div>
  ) 
}


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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  // Tapahtumankäsittelijät
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length === 0) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
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