import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

let showNotification;

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Notification extends React.Component {
  static show({ message }) {
    showNotification({ message });
  }

  state = {
    open: false,
    message: ''
  };

  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  componentDidMount() {
    showNotification = this.handleShow;
  }

  handleShow = ({ message }) => {
    this.setState({
      open: true,
      message
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { open, message } = this.state;
    const { classes } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        message={
          <span id="message-id" dangerouslySetInnerHTML={{ __html: message }} />
        }
        autoHideDuration={6000}
        onClose={this.handleClose}
        open={open}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

export default withStyles(styles)(Notification);
