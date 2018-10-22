import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 3,
    width: 240,
    padding: theme.spacing.unit * 1
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class DetailSource extends React.Component {
  state = {
    open: true
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      link: nextProps.postQuery.Post.link,
      latitude: nextProps.postQuery.Post.location.latitude,
      longitude: nextProps.postQuery.Post.location.longitude
    });
  }

  render() {
    const { classes } = this.props;

    if (this.props.postQuery.loading) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">View source</DialogTitle>
        <DialogContent>
          <TextField
            label="Link"
            className={classes.textField}
            value={this.state.link}
            onChange={e => this.setState({ link: e.target.value })}
            margin="normal"
            autoFocus
          />
          <TextField
            label="Latitude"
            className={classes.textField}
            value={this.state.latitude}
            type="number"
            onChange={e => this.setState({ latitude: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            label="Longitude"
            className={classes.textField}
            value={this.state.longitude}
            type="number"
            onChange={e => this.setState({ longitude: Number(e.target.value) })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handlePost} color="primary">
            Save source
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleClose = async () => {
    this.props.history.replace('/sources');
  };

  handleDelete = async () => {
    await this.props.deletePostAndLocationMutation({
      variables: {
        postId: this.props.postQuery.Post.id,
        locationId: this.props.postQuery.Post.location.id
      }
    });
    this.props.history.replace('/sources');
  };

  handlePost = async () => {
    await this.props.updatePostAndLocationMutation({
      variables: {
        postId: this.props.postQuery.Post.id,
        link: this.state.link,
        locationId: this.props.postQuery.Post.location.id,
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    });
    this.props.history.replace('/sources');
  };
}

const DELETE_POST_AND_LOCATION_MUTATION = gql`
  mutation DeletePostAndLocationMutation($postId: ID!, $locationId: ID!) {
    deletePost(id: $postId) {
      id
    }
    deleteLocation(id: $locationId) {
      id
    }
  }
`;

const UPDATE_POST_AND_LOCATION_MUTATION = gql`
  mutation UpdatePostAndLocationMutation(
    $postId: ID!
    $locationId: ID!
    $link: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    updatePost(id: $postId, link: $link) {
      id
    }
    updateLocation(
      id: $locationId
      latitude: $latitude
      longitude: $longitude
    ) {
      id
    }
  }
`;

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    Post(id: $id) {
      id
      link
      location {
        id
        latitude
        longitude
      }
    }
  }
`;

export default withStyles(styles)(
  withRouter(
    compose(
      graphql(POST_QUERY, {
        name: 'postQuery',
        options: ({ match }) => ({
          variables: {
            id: match.params.id
          }
        })
      }),
      graphql(DELETE_POST_AND_LOCATION_MUTATION, {
        name: 'deletePostAndLocationMutation'
      }),
      graphql(UPDATE_POST_AND_LOCATION_MUTATION, {
        name: 'updatePostAndLocationMutation'
      })
    )(DetailSource)
  )
);
