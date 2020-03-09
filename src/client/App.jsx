import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '../router'


const App = () => {
  return (
    <Router>
      <div>
        { renderRoutes(routes) }
      </div>
    </Router>
  )
}


export default App
