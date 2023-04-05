const Header = ({courseName}) => {
    console.log(courseName)
    return (
      <>
      <h2>{courseName}</h2>
      </>
    )
  }
  const Content = (props) =>{
    const parts = props.parts
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </>
    )
  }
  
  const Part = (props) => {
     console.log(props.part)
     return (
      <>
      <p>{props.part.name} {props.part.exercises}</p>
      </>
     )
  }
  const Course = (props) => {
    const courseName = props.course.name
    console.log(courseName)
    const totalExercises = props.course.parts.reduce((acc, part) => acc + part.exercises, 0)
    return(
      <>
      <Header courseName={courseName}/>
      <Content parts={props.course.parts}/>
      <p>Total exercises in this course: <b>{totalExercises}</b></p>
      </>
    )
  }

export default Course