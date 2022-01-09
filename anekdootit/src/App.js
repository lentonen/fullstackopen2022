import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

// Etsii taulukon suurimman arvon paikan. Jos useita yhtä suuria, ensin löydetty. 
const largestValueIndex = (array) => {
  let largest = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] > array[largest])
      largest = i
  }
  return largest
}

// Arpoo kokonaisuluvun [min, max]
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * ( max - min + 1) + min)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  
  const [selected, setSelected] = useState(0)   // Tila, joka kertoo mikä anekdootti näkyy
  const[points, setPoints] = useState(Array(anecdotes.length).fill(0)) // Tila anekdoottien äänille. Luo oikean mittaisen taulukon pisteille
  const[mostVotes, setMostVotes] = useState(0)  // Tila suurimman äänimäärän saaneelle anekdootille
  
  // Arpoo ja asettaa random anekdootin
  const randomAnecdote = () => setSelected(randomIntFromInterval(0, anecdotes.length-1))

  // Funktio anekdootin äänestämiseen yhteydessä suorittaa pistelaskun 
  // ja suurimman äänimäärän saaneen anekdootin etsimisen.
  const voteAnecdote = () => {
    const copy =[...points]
    copy[selected] += 1
    setPoints(copy)
    setMostVotes(largestValueIndex(copy))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>Has {points[selected]} votes</div>
      <div>
        <Button handleClick={voteAnecdote} text='Vote' />
        <Button handleClick={randomAnecdote} text='Next anecdote' />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
    </div>
  )
}

export default App