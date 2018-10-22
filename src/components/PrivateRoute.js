import React from 'react';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render() {
    const { render, ...rest } = this.props;

    return (
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
  }
}

export default PrivateRoute;
