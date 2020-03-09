import React from 'react'
import { StaticRouter, Route } from 'react-router-dom'
import routes from '../router/index.jsx'


const App = (props) => {
  const { req, context } = props;
  return (
      <StaticRouter location={req.path} context={context}>
        <div>
          {
            routes.map(route => (
              <Route {...route} />
            ))
          }
        </div>
      </StaticRouter>
  )
}


export default App
