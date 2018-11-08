import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
});

const ALL_CONFIGS = gql`
  query AllConfigs($skip: Int = 0, $first: Int = 5) {
    allConfigs(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      createdAt
      user {
        email
      }
    }
    meta: _allConfigsMeta {
      count
    }
  }
`;

class ConfigList extends Component {
  state = {
    page: 0,
    rowsPerPage: 5
  };

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired
  };

  render() {
    const { classes, history } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <Query
        query={ALL_CONFIGS}
        variables={{
          skip: page * rowsPerPage,
          first: 5
        }}
      >
        {({ loading, data, fetchMore }) => {
          if (loading) return <Loading />;

          return (
            <Paper className={classes.root}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>updatedAt</TableCell>
                    <TableCell>updatedBy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.allConfigs.map(config => (
                    <TableRow
                      key={config.id}
                      onClick={() => history.push(`/configs/${config.id}`)}
                    >
                      <TableCell>
                        {new Date(config.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{config.user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={data.meta.count}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page'
                }}
                onChangePage={(event, page) => {
                  this.setState({ page });

                  fetchMore({
                    variables: {
                      skip: page * rowsPerPage
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return {
                        ...prev,
                        allConfigs: fetchMoreResult.allConfigs
                      };
                    }
                  });
                }}
                rowsPerPageOptions={[]}
              />
            </Paper>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ConfigList);
