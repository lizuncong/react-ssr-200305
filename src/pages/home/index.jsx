import React from 'react'


const Home = () => {
  return (
    <div>
      <div>This is home page !!!</div>
      <button
        onClick={() => {
          alert('This is a button!')
        }}
      >
        click me
      </button>
    </div>
  )
}

export default Home
