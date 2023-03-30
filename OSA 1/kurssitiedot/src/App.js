const Header = (props) => {
  console.log(props.course)
  return (
    <>
    <p>{props.course.name}</p>
    </>
  )
}
const Content = (props) =>{
  console.log(props.course.parts[0].name)
  return (
    <>
    <Part part = {props.course.parts[0]} />
    <Part part = {props.course.parts[1]} />
    <Part part = {props.course.parts[2]} />
    </>
  )
}
const Part = (props) => {
   console.log(props.part)
   return (
    <>
    <p>{props.part.name}</p>
    <p>{props.part.exercises}</p>
    </>
   )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
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
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

export default App
