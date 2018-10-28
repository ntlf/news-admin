import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ render, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('newsToken') ? (
        render(props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
