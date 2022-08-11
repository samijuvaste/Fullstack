import { useState } from 'react'

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

  const random = () => Math.floor(Math.random() * anecdotes.length)
   
  const [selected, setSelected] = useState(random())
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const vote = () => {
    const copy = {...points}
    copy[selected]++
    setPoints(copy)
  }

  const getMost = () => {
    let most = 0
    for (let p in points) {
      if (points[p] > points[most]) {
        most = p
      }
    }
    return most
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br/>
      has {points[selected]} votes
      <br/>
      <button onClick={vote}>vote</button>
      <button onClick={() => setSelected(random)}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[getMost()]}
      <br/>
      has {points[getMost()]} votes
    </div>
  )
}

export default App