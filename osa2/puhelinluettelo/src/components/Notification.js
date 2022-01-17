import React from 'react'

const Notification = ({ message, type }) => {
  console.log(type)
    const error = {
      color: 'red',
      fontColor:'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }

    const successful = {
      color: 'green',
      fontColor:'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }
    

    if (message === null) {
      return null
    }

    
    if (type === 'error') {
      return (
        <div style={error}>
          {message}
        </div>
      )
    }

    if (type === 'successful') {
      return (
        <div style={successful}>
          {message}
        </div>
      )
    }
  
    
  }

  export default Notification