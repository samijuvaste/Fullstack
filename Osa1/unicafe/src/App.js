import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (100 * good / total) + ' %'

  return (
    <table>
      <tbody>
      <StatisticLine text={'good'} value={good}/>
      <StatisticLine text={'neutral'} value={neutral}/>
      <StatisticLine text={'bad'} value={bad}/>
      <StatisticLine text={'all'} value={total}/>
      <StatisticLine text={'average'} value={average}/>
      <StatisticLine text={'positive'} value={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={'give feedback'}/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Header text={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App