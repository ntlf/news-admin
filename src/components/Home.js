import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from './Loading';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
});

const STATISTICS = gql`
  query Statistics {
    Statistics {
      indices
      lastArticles
    }
  }
`;

class Home extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <Query query={STATISTICS}>
        {({ loading, data }) => {
          if (loading) return <Loading />;

          return (
            <>
              <Paper className={classes.root}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>index</TableCell>
                      <TableCell>docs.count</TableCell>
                      <TableCell>docs.deleted</TableCell>
                      <TableCell>store.size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.Statistics.indices.map(index => (
                      <TableRow key={index.index}>
                        <TableCell>{index.index}</TableCell>
                        <TableCell>{index['docs.count']}</TableCell>
                        <TableCell>{index['docs.deleted']}</TableCell>
                        <TableCell>{index['store.size']}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>

              <Paper className={classes.root}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>domain</TableCell>
                      <TableCell>count</TableCell>
                      <TableCell>date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.Statistics.lastArticles.map(site => (
                      <TableRow key={site.domain}>
                        <TableCell>{site.domain}</TableCell>
                        <TableCell>{site.count}</TableCell>
                        <TableCell>
                          {new Date(site.date).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Home);
