import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({text, value}) => <div>{text} {value}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => setGood(good + 1)
  const giveNeutral = () => setNeutral(neutral + 1)
  const giveBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={giveGood} text='Good' />
      <Button handleClick={giveNeutral} text='Neutral' />
      <Button handleClick={giveBad} text='Bad' />
      <h1>Statistics</h1>
      <Statistics text='Good' value={good} />
      <Statistics text='Neutral' value={neutral} />
      <Statistics text='Bad' value={bad} />
    </div>
  )
}

export default App