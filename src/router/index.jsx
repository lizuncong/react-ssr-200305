import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../pages/home'

export default (
  <div>
    <Route path="/" exact component={Home} />
  </div>
)
