import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsPart = ({text, value, unit}) => <div>{text} {value} {unit}</div>

const Statistics = ({statistics}) => {
  if (statistics.parts[3].value !== 0) {
    return (
      <div>
        <StatisticsPart text={statistics.parts[0].text} value={statistics.parts[0].value} />
        <StatisticsPart text={statistics.parts[1].text} value={statistics.parts[1].value} />
        <StatisticsPart text={statistics.parts[2].text} value={statistics.parts[2].value} />
        <StatisticsPart text={statistics.parts[3].text} value={statistics.parts[3].value} />
        <StatisticsPart text={statistics.parts[4].text} value={statistics.parts[4].value} />
        <StatisticsPart text={statistics.parts[5].text} value={statistics.parts[5].value} unit={statistics.parts[5].unit} />
      </div>
    )
  }
  return (
    <div>No feedback given</div>
  )
}  

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => setGood(good + 1)
  const giveNeutral = () => setNeutral(neutral + 1)
  const giveBad = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1)/all
  const positivePercent = (good / all)*100

  const statistics = {
    parts: [
      {
        text: 'Good',
        value: good,
        unit: ''
      },
      {
        text: 'Neutral',
        value: neutral,
        unit: ''
      },
      {
        text: 'Bad',
        value: bad,
        unit: ''
      },
      {
        text: 'All',
        value: all,
        unit: ''
      },
      {
        text: 'Average',
        value: average,
        unit: ''
      },
      {
        text: 'Positive',
        value: positivePercent,
        unit: '%'
      }
    ]
  }
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={giveGood} text='Good' />
      <Button handleClick={giveNeutral} text='Neutral' />
      <Button handleClick={giveBad} text='Bad' />
      <h1>Statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App