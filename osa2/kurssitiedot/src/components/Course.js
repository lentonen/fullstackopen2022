import React from 'react'

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

export default Course