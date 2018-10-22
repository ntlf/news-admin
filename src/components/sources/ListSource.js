import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Button from '@material-ui/core/Button/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  tableRoot: {
    width: '100%',
    maxWidth: '720px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 240
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200
  },
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 5,
    right: theme.spacing.unit * 2,
    zIndex: 9999
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
});

class ListSource extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.allPostsQuery.refetch();
    }
  }

  componentWillMount() {
    this.props.allPostsQuery.refetch();
  }

  render() {
    const { classes } = this.props;

    if (this.props.allPostsQuery.loading) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <div className="list-posts">
        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.allPostsQuery.allPosts &&
                this.props.allPostsQuery.allPosts.map(post => (
                  <TableRow
                    key={post.id}
                    onClick={() =>
                      this.props.history.push(`/sources/detail/${post.id}`)
                    }
                  >
                    <TableCell>{post.link}</TableCell>
                  </TableRow>
                ))}
              {!this.props.allPostsQuery.allPosts && (
                <TableRow>
                  <TableCell>empty</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
        <Link to="/sources/create" className="create-link">
          <Button variant="fab" className={classes.fab} color="secondary">
            <AddIcon />
          </Button>
        </Link>
      </div>
    );
  }
}

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts {
      id
      link
    }
  }
`;

export default withStyles(styles)(
  graphql(ALL_POSTS_QUERY, {
    name: 'allPostsQuery',
    options: {
      fetchPolicy: 'network-only',
      variables: {}
    }
  })(ListSource)
);
