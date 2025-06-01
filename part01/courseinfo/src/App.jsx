const Header = (prop) => {
  return (
    <>
      <h1>{prop.course.name}</h1>
    </>
  )
}
const Part = (prop) => {
  return (
    <>
      <p>
        {prop.name} {prop.exercises}
      </p>
    </>
  )
}

const Content = (prop) => {
  console.log(prop)
  return (
    <>
      <Part name={prop.parts[0].name} exercises={prop.parts[0].exercises}/>
      <Part name={prop.parts[1].name} exercises={prop.parts[1].exercises}/>
      <Part name={prop.parts[2].name} exercises={prop.parts[2].exercises}/>
    </>
  )
}

const Total = (prop) => {
  return (
    <>
      <p>Number of exercises {prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    
  )
}

export default App
