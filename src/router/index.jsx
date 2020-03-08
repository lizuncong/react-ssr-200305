import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../pages/home/connect'
import Login from '../pages/login/connect'

export default (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
  </div>
)
