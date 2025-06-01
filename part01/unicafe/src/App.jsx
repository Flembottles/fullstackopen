import { useState } from 'react'

const Button = ({onClick, text}) => 
  <button onClick={onClick}>{text}</button>

const StatisticsLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td><td>{props.value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <>
        <h1>{props.header}</h1>
        <div>No feedback given</div>
      </>
    )
  }
  
  return (
    <>
      <h1>{props.header}</h1>
      <table>
        <tbody>
          <StatisticsLine text='Good' value={props.good}/>
          <StatisticsLine text='Neutral' value={props.neutral}/>
          <StatisticsLine text='Bad' value={props.bad}/>
          <StatisticsLine text='All' value={props.all}/>
          <StatisticsLine text='Average' value={props.average}/>
          <StatisticsLine text='Positive' value={props.positive}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    const updatedGood = good+1
    const updatedAll = all+1
    
    setGood(updatedGood)
    setAll(updatedAll)
    setAverage((updatedGood-bad)/updatedAll)
    setPositive(updatedGood/updatedAll)
  }
  const increaseNeutral = () => {
    const updatedAll = all+1
    
    setNeutral(neutral+1)
    setAll(updatedAll)
    setAverage((good-bad)/updatedAll)
    setPositive(good/updatedAll)
  }
  const increaseBad = () => {
    const updatedBad = bad+1
    const updatedAll = all+1
    
    setBad(updatedBad)
    setAll(updatedAll)
    setAverage((good-updatedBad)/updatedAll)
    setPositive(good/updatedAll)
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={increaseGood} text='good'/>
      <Button onClick={increaseNeutral} text='neutral'/>
      <Button onClick={increaseBad} text='bad'/>
      <Statistics header='Statistics' 
        good={good} 
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}/>
      
      
    </div>
  )
}

export default App