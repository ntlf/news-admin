import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: 240,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const Loading = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress className={classes.progress} />
  </div>
);

Loading.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Loading);
