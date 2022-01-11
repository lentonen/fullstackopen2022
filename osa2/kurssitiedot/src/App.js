import React from 'react'

const Total = ({courses}) => {
  const total = courses.reduce((total, course) => total + (course.parts.reduce((total, part) => total + part.exercises, 0)),0)
  return (
    <div>
      <p><b>Total of exercises {total}</b></p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Header = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course = {course} />
      <Content course = {course}  />
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course =>
        <Course key = {course.id} course = {course} />
      )}
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 10,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
      <Total courses={courses} />
    </div>
  )
}

export default App