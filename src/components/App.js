import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { privateRoutes, publicRoutes } from '../routes';
import MiniDrawer from './MiniDrawer';

const App = () => (
  <Switch>
    <Redirect from="/" to="/home" exact />
    {publicRoutes.map((route, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Route key={i} {...route} />
    ))}
    {privateRoutes.map(({ component: Component, path }, i) => (
      <PrivateRoute
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        path={path}
        render={props => (
          <MiniDrawer>
            <Component {...props} />
          </MiniDrawer>
        )}
      />
    ))}
  </Switch>
);

export default App;
