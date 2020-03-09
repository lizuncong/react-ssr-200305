import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './components/header'
import routes from './router'

class App extends React.Component{

  render(){
    return (
      <div>
        <Header />
        { renderRoutes(routes) }
      </div>
    )
  }
}

export default App
