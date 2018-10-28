import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import ReactJson from 'react-json-view';
import isEqual from 'lodash/isEqual';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import ConfigForm from './ConfigForm';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';

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

const CREATE_CONFIG = gql`
  mutation CreateConfig($data: Json!, $userId: ID!) {
    createConfig(data: $data, userId: $userId) {
      id
      user {
        id
      }
    }
  }
`;

const CONFIG_AND_USER = gql`
  query Config($configId: ID!) {
    Config(id: $configId) {
      id
      data
    }
    user {
      id
    }
  }
`;

class Config extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    data: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { classes, data, onChange } = this.props;

    return (
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
  }
}

export default withStyles(styles)(Config);
