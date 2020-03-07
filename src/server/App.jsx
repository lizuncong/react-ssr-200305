import React from 'react'
import { StaticRouter } from 'react-router-dom'
import Routes from '../router/index.jsx'


const App = (props) => {
  const { req, context } = props;
  return (
      <StaticRouter location={req.path} context={context}>
        { Routes }
      </StaticRouter>
  )
}


export default App
