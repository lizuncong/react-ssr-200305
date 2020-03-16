import React from 'react';
import {
  BrowserRouter, StaticRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import routes from './routes'

class IRouter extends React.Component{
  renderRoute(route){
    const routeProps = {}
    const component = route.component;
    if(route.routes && route.routes.length){
      const childrenProps = (
        <Switch>
          {
            route.routes.map(rou => this.renderRoute(rou))
          }
        </Switch>
      )
      routeProps.render = () =>
        React.createElement(component, {}, childrenProps)
    } else {
      routeProps.component = component
    }
    return <Route {...routeProps} key={route.key} path={route.path} />
  }

  render(){
    const { serverSide, req, context } = this.props;

    const Router = serverSide ? StaticRouter : BrowserRouter;
    const routerConfig = serverSide ?
      {location: req.path, context: context} : {}
    return React.createElement(Router, routerConfig,
      <Switch>
        {
          routes.map(route => this.renderRoute(route))
        }
      </Switch>
    )
  }
}

export default IRouter
