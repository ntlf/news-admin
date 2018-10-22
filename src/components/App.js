import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { privateRoutes, publicRoutes } from '../routes';
import MiniDrawer from './MiniDrawer';

class App extends Component {
  render() {
    return (
      <MiniDrawer>
        <Switch>
          <Redirect from="/" to="/home" exact />
          {publicRoutes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          {privateRoutes.map((route, i) => (
            <PrivateRoute key={i} {...route} />
          ))}
        </Switch>
      </MiniDrawer>
    );
  }
}

export default App;
