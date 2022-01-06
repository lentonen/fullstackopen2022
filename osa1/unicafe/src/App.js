import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value, unit}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({statistics}) => {
  if (statistics.parts[3].value !== 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text={statistics.parts[0].text} value={statistics.parts[0].value} />
            <StatisticsLine text={statistics.parts[1].text} value={statistics.parts[1].value} />
            <StatisticsLine text={statistics.parts[2].text} value={statistics.parts[2].value} />
            <StatisticsLine text={statistics.parts[3].text} value={statistics.parts[3].value} />
            <StatisticsLine text={statistics.parts[4].text} value={statistics.parts[4].value} />
            <StatisticsLine text={statistics.parts[5].text} value={statistics.parts[5].value +' %'} /> 
          </tbody>
        </table>
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
      },
      {
        text: 'Neutral',
        value: neutral,
      },
      {
        text: 'Bad',
        value: bad,
      },
      {
        text: 'All',
        value: all,
      },
      {
        text: 'Average',
        value: average,
      },
      {
        text: 'Positive',
        value: positivePercent,
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