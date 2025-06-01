import {useState} from 'react'

const Display = ({counter}) => <div>{counter}</div>

// const Button = (props) => {
//   return (
//     <button onClick={props.onClick}>
//       {props.text}
//     </button>
//   )
// }

const Button = ({onClick, text}) => 
  <button onClick={onClick}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  const setToZero = () => { 
    console.log('resetting , value before', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text='Increase'/>
      <Button onClick={setToZero} text='Reset'/>
      <Button onClick={decreaseByOne} text='Decrease'/>
    </div>
  )
}

export default App