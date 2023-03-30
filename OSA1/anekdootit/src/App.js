import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  'The only way to go fast, is to go well.'
]

  const App = () => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  
    const handleClick = () => {
      const randomNum = Math.floor(Math.random() * anecdotes.length)
      setSelected(randomNum)
    };
  
    const handleVote = () => {
      const newPoints = [...points]
      newPoints[selected] += 1
      setPoints(newPoints)
    };
    const mostVotes = () => {
      const largestIndex = points.reduce((maxIndex, currentValue, currentIndex, array) => {
        return currentValue > array[maxIndex] ? currentIndex : maxIndex
      }, 0)
      
      return { anecdote: anecdotes[largestIndex], votes: points[largestIndex] }
    }
    
    return (
      <div>
        <h1>Anectdote of the day</h1>
        {anecdotes[selected]}
        <p>This anecdote has this many votes: {points[selected]}</p>
        <button onClick={handleClick}>Random anecdote</button>
        <button onClick={handleVote}>Vote</button>
        <h1>Most liked anecdote</h1>
        <p>{mostVotes().anecdote}</p>
        <p>Number of votes: {mostVotes().votes}</p>
      </div>
    )
    
  }
  
  export default App