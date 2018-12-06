import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import Notification from './Notification';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    maxWidth: 320,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 3
  },
  action: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const SIGNIN_USER = gql`
  mutation SigninUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired
  };

  render() {
    const { classes, history, location } = this.props;
    const { email, password } = this.state;
    const { from } = location.state || {
      from: { pathname: '/home' }
    };

    if (localStorage.getItem('newsToken')) {
      return <Redirect to={from} push />;
    }

    return (
      <Mutation
        mutation={SIGNIN_USER}
        onCompleted={data => {
          localStorage.setItem('newsToken', data.signinUser.token);
          Notification.show({ message: 'Successful login' });
          history.replace(from);
        }}
      >
        {signinUser => (
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h5">News Admin</Typography>
            <Typography variant="h6">Login</Typography>
            <form
              onSubmit={e => {
                e.preventDefault();
                signinUser({
                  variables: {
                    email,
                    password
                  }
                });
              }}
            >
              <TextField
                label="Email"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                margin="normal"
                fullWidth
                autoFocus
              />
              <TextField
                label="Password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                margin="normal"
                type="password"
                autoComplete="off"
                fullWidth
              />
              <div className={classes.action}>
                <Button
                  color="primary"
                  onClick={() => history.push('/register')}
                >
                  Register
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={!email || !password}
                >
                  Login
                </Button>
              </div>
            </form>
          </Paper>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(Login);
