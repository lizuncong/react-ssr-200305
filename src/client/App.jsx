import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from '../router'


const App = () => {
  return (
    <Router>
      <div>
        {
          routes.map(route => (
            <Route {...route} />
          ))
        }
      </div>
    </Router>
  )
}


export default App
