import React from 'react';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem('newsToken') ? (
            <Component {...props} />
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
  }
}

export default PrivateRoute;
