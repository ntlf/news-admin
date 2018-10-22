import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";


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
    marginRight: theme.spacing.unit,
  },
})

class CreateSource extends React.Component {
  state = {
    open: true,
    link: '',
    latitude: 0,
    longitude: 0
  }

  render() {
    const { classes } = this.props


    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add new source</DialogTitle>
        <DialogContent>
          <TextField
            label='Link'
            className={classes.textField}
            value={this.state.link}
            onChange={e => this.setState({ link: e.target.value })}
            margin='normal'
            autoFocus
          />
          <TextField
            label='Latitude'
            className={classes.textField}
            value={this.state.latitude}
            type='number'
            onChange={e => this.setState({ latitude: Number(e.target.value) })}
            margin='normal'
          />
          <TextField
            label='Longitude'
            className={classes.textField}
            value={this.state.longitude}
            type='number'
            onChange={e => this.setState({ longitude: Number(e.target.value) })}
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handlePost} color='primary'>
            Add source
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  handlePost = async () => {
    const { link, latitude, longitude } = this.state
    await this.props.createPostMutation({ variables: { link, latitude, longitude } })
    this.props.history.replace('/sources')
  }

  handleClose = async () => {
    this.props.history.replace('/sources')
  }

}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($link: String!, $latitude: Float!, $longitude: Float!) {
    createPost(link: $link, location: {latitude: $latitude, longitude: $longitude}) {
      id
      link
      location {
        latitude
        longitude
      }
    }
  }
`

export default withStyles(styles)(withRouter(graphql(CREATE_POST_MUTATION, { name: 'createPostMutation' })(CreateSource)))
