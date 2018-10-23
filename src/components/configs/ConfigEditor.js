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

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
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
  state = {
    localData: undefined
  };

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired
  };

  render() {
    const { classes, match, history } = this.props;
    const { localData } = this.state;

    return (
      <Query
        query={CONFIG_AND_USER}
        variables={{ configId: match.params.id }}
        onCompleted={data =>
          !localData &&
          this.setState({
            localData: data.Config.data || {}
          })
        }
        notifyOnNetworkStatusChange
      >
        {({ loading, data }) => {
          if (loading) return <Loading />;

          return (
            <>
              <Mutation
                mutation={CREATE_CONFIG}
                onCompleted={data =>
                  history.push(`/configs/${data.createConfig.id}`)
                }
              >
                {createConfig => (
                  <Button
                    variant="fab"
                    className={classes.fab}
                    onClick={() =>
                      createConfig({
                        variables: {
                          data: localData,
                          userId: data.user.id
                        }
                      })
                    }
                    color="secondary"
                    disabled={isEqual(localData, data.Config.data)}
                  >
                    <SaveIcon />
                  </Button>
                )}
              </Mutation>
              <Paper className={classes.root}>
                <ReactJson
                  name={false}
                  collapsed={false}
                  src={localData}
                  collapseStringsAfterLength={32}
                  onEdit={e => this.setState({ localData: e.updated_src })}
                  onDelete={e => this.setState({ localData: e.updated_src })}
                  onAdd={e => this.setState({ localData: e.updated_src })}
                  displayObjectSize
                  enableClipboard={false}
                  indentWidth={4}
                  displayDataTypes={false}
                  iconStyle="triangle"
                />
              </Paper>
            </>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Config);
