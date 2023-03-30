import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  const value = parseFloat(props.value);
  const formattedValue = value % 1 === 0 ? value : value.toFixed(2);

  return (
    <>
    <tr>
      <td>{props.text}</td>
      <td>{formattedValue}{props.endtext}</td>
    </tr>
    </>
   // <p>{props.text}: {formattedValue}{props.endtext}</p>
  );
}

const Statistics = props => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
        <StatisticLine value={good} text="Good" />
        <StatisticLine value={neutral} text="Neutral" />
        <StatisticLine value={bad} text="Bad" />
        <StatisticLine value={good + neutral + bad} text="Total" />
        <StatisticLine value={(good - bad) / (good + neutral + bad)} text="Average" />
        <StatisticLine value={((good / (good + neutral + bad)) * 100) } text="Positive" endtext="%" />
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text = "good"/>
      <Button handleClick={handleNeutralClick} text = "neutral"/>
      <Button handleClick={handleBadClick} text = "bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App