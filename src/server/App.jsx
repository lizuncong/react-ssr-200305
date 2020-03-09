import React from 'react'
import { StaticRouter, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '../router/index.jsx'

const App = (props) => {
  const { req, context } = props;
  return (
      <StaticRouter location={req.path} context={context}>
        <div>
          { renderRoutes(routes) }
        </div>
      </StaticRouter>
  )
}


export default App
