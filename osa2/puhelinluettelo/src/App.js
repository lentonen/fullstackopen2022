import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = () => {
  // Tilat
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)

  
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

  // Tapahtumankäsittelijä henkilön numeron poistamiselle
  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) { // Poistetaan vain, jos valitaan "OK"
      personService
      .deleteObject(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        handleNotification(`Deleted ${person.name}`, 'successful') 
      })
    }
  }

  // Tapahtumankäsittelijä notifikaatioille
  const handleNotification = (message, type) => {
    setNotificationStyle(type)
          setNotificationMessage(message)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)  
  }

  // Lisää uuden henkilön tiedot palvelimelle ja päivittää tilan
  const addName = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    if (persons.filter(person => person.name === newName).length === 0) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          handleNotification(`Added ${newName}`, 'successful') 
        })
        .catch(error => {
          console.log(error.response.data)
          handleNotification(error.response.data, 'error')
        })
    }
    else {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number
      with a new one?`)
      if (confirm) { // päivitetään vain, jos valitaan "OK"
        const id = persons.find(person => person.name === newName).id   // Päivitettävän henkilön id
        const updatedPersons = [...persons]                             // Kopio päivitettävästä persons-listasta
        const index = persons.findIndex(person => person.id === id)     // Indeksi jossa päivitettävät hlö on                     
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            updatedPersons[index] = returnedPerson                      // Lopullinen päivitetty lista
            setPersons(updatedPersons)
            handleNotification(`Updated ${newName}`, 'successful')   
          }).catch(error => {  //Käsittelee virheen, kun käyttäjä on poistettu ennen päivityksen tekemistä
            setPersons(persons.filter(p => p.id !== id))
            handleNotification(`Information of ${personObject.name} has already been removed from the server`, 'error')
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebooki</h1>
      <Notification message={notificationMessage} type = {notificationStyle} />
      <Filter setFilter = {setFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete = {handleDelete} />
    </div>
  )

}

export default App