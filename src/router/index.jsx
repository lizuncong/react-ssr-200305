import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../pages/home/index.jsx'
import Login from '../pages/login/index.jsx'

export default (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
  </div>
)
