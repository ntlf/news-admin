import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import isEqual from 'lodash/isEqual';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button/Button';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Loading from '../Loading';
import ConfigForm from './ConfigForm';
import ConfigJson from './ConfigJson';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3
  },
  fab: {
    position: 'fixed',
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
    localData: undefined,
    tab: 0
  };

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired
  };

  handleTabChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {
    const { classes, match, history } = this.props;
    const { localData, tab } = this.state;

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
              <Tabs
                value={tab}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Form" />
                <Tab label="JSON" />
              </Tabs>
              {tab === 0 &&
                localData && (
                  <ConfigForm
                    data={localData}
                    onChange={data =>
                      this.setState(state => ({
                        localData: {
                          base_urls: state.localData.base_urls.map(
                            (site, i) => ({ ...site, ...data.base_urls[i] })
                          )
                        }
                      }))
                    }
                  />
                )}
              {tab === 1 &&
                localData && (
                  <ConfigJson
                    data={localData}
                    onChange={data => this.setState({ localData: data })}
                  />
                )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Config);
