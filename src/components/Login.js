import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles/index'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
})

class Login extends Component {
  state = {
    open: true,
    email: '',
    password: ''
  }


  render() {
    const { classes } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/home' } }

    if (localStorage.getItem('newsToken')) {
      return (
        <Redirect
          to={from}
          push />
      )
    }

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Login</DialogTitle>
        <DialogContent>
          <TextField
            label='Email'
            className={classes.textField}
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            margin='normal'
            fullWidth
            autoFocus
          />
          <TextField
            label='Password'
            className={classes.textField}
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            margin='normal'
            type='password'
            autoComplete='off'
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={this.signinUser} color='primary'>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  signinUser = async () => {
    try {
      const user = await this.props.signinUserMutation(
        {
          variables:
            {
              email: this.state.email,
              password: this.state.password
            }
        }
      )

      localStorage.setItem('newsToken', user.data.signinUser.token)
      this.forceUpdate()
    } catch (e) {
      console.error(`An error occured: `, e)
    }

  }
}

const CREATE_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
    }
  }
`


export default withStyles(styles)(graphql(CREATE_USER_MUTATION, {
  name: 'signinUserMutation'
})(Login))
