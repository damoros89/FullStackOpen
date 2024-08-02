/* eslint-disable react/prop-types */


const Header = ({course})=>{
  console.log(course)
  return (
   <div>
     <h1>{course}</h1>
   </div>
)
}

const Part = ({part, exercises})=>{
  return (
    <div>
      <p>{part} {exercises}</p>
    </div>
  )
}

const Content = (props)=>{
  console.log("props", props.parts[0].name)
  return (
    <div>
      <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises}></Part>
      <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises}></Part>
      <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises}></Part>
    </div>
  )
}

const Total = (props) =>{
  console.log("props",props.exercises1)
  return (
    <p>
      Number of exercises {props.exercises1+props.exercises2+props.exercises3}
    </p>
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

  console.log(course)

  return (
    <div>
      <Header course={course.name}/>
      <Content parts = {course.parts}
      // part1 = {course.parts[0].name}
      // exercises1 = {course.parts[0].exercises}
      // part2 = {course.parts[1].name}
      // exercises2 = {course.parts[1].exercises}
      // part3 = {course.parts[2].name}
      // exercises3 = {course.parts[2].exercises}
      />
      <Total exercises1 = {course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3= {course.parts[2].exercises} />
    </div>
  )

}

export default App
