import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
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

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
  }
`;

class Register extends Component {
  state = {
    email: '',
    password: '',
    passwordAgain: ''
  };

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired
  };

  render() {
    const { classes, history } = this.props;
    const { email, password, passwordAgain } = this.state;

    return (
      <Mutation
        mutation={CREATE_USER}
        onCompleted={() => {
          Notification.show({ message: 'Successfull registration' });
          history.push('/login');
        }}
      >
        {signinUser => (
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h5">News Admin</Typography>
            <Typography variant="h6">Registration</Typography>
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
              <TextField
                label="Password Again"
                value={passwordAgain}
                onChange={e => this.setState({ passwordAgain: e.target.value })}
                margin="normal"
                type="password"
                autoComplete="off"
                fullWidth
                error={password !== passwordAgain}
              />
              <div className={classes.action}>
                <Button color="primary" onClick={() => history.push('/login')}>
                  Login
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={password !== passwordAgain || !email || !password}
                >
                  Register
                </Button>
              </div>
            </form>
          </Paper>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(Register);
