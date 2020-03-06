import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './router/index.jsx'


const App = () => {
  return (
    <Router>
      { Routes }
    </Router>
  )
}


export default App
