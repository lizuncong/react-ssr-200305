import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './components/header'

class App extends React.Component{

  render(props){
    return (
      <div>
        <Header />
        { renderRoutes(props.route.routes) }
      </div>
    )
  }
}

export default App
