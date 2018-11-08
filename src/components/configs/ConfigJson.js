import React from 'react';
import ReactJson from 'react-json-view';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3
  },
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 5,
    right: theme.spacing.unit * 2,
    zIndex: 9999
  }
});

const Config = ({ classes, data, onChange }) => (
  <Paper className={classes.root}>
    <ReactJson
      name={false}
      collapsed={false}
      src={data}
      collapseStringsAfterLength={32}
      onEdit={e => onChange(e.updated_src)}
      onDelete={e => onChange(e.updated_src)}
      onAdd={e => onChange(e.updated_src)}
      displayObjectSize
      enableClipboard={false}
      indentWidth={4}
      displayDataTypes={false}
      iconStyle="triangle"
    />
  </Paper>
);

Config.propTypes = {
  classes: PropTypes.shape().isRequired,
  data: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Config);
