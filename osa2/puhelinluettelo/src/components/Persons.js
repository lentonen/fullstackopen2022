import React from 'react'

// Komponentti filterin perusteella löydettyjen henkilöiden tietojen näyttämiselle
const Persons = ({persons, filter, handleDelete}) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return ( 
    <div>
      {personsToShow.map(person => 
        <Person key={person.name} person = {person} handleDelete = {handleDelete} />
      )}
    </div>
  )
}

// Komponentti yksittäisen henkilön tiedoille
const Person = ({person, handleDelete}) => <p key={person.name}>{person.name} {person.number} <Button handleClick={() => handleDelete(person)} text ="delete" /></p>

// Painike -komponentti
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

export default Persons