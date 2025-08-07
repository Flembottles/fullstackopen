const Header = (props) => <h2>{props.course}</h2>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) =>
        <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  return (
    <p><strong>Number of exercises {props.total}</strong></p>
  )
}

const Course = ({ course, parts }) => {
  parts = course.parts
  const initialValue = 0

  const courseTotal = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue,
  );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={courseTotal} />
    </div>
  )
}

export default Course