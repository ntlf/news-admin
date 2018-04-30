import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { withStyles } from 'material-ui/styles/index'
import { Button, CircularProgress } from 'material-ui'
import ReactJson from 'react-json-view'
import SaveIcon from 'material-ui-icons/Save'


const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 5,
    right: theme.spacing.unit * 2,
    zIndex: 9999
  },
})

class Config extends React.Component {
  state = {
    data: {}
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      data: nextProps.configQuery.allConfigs[0].data || {},
      id: nextProps.configQuery.allConfigs[0].id
    })
  }

  render() {
    const { classes } = this.props

    if (this.props.configQuery.loading) {
      return (
        <CircularProgress className={classes.progress} />
      )
    }

    return (
      <div>
        <Button variant='fab' className={classes.fab} onClick={this.handleUpdate} color='secondary'>
          <SaveIcon />
        </Button>
        <ReactJson
          name={false}
          collapsed={false}
          src={this.state.data}
          collapseStringsAfterLength={32}
          onEdit={e =>
            this.setState({ data: e.updated_src })
          }
          onDelete={e =>
            this.setState({ data: e.updated_src })
          }
          onAdd={e =>
            this.setState({ data: e.updated_src })
          }
          displayObjectSize={true}
          enableClipboard={false}
          indentWidth={4}
          displayDataTypes={false}
          iconStyle={"triangle"}
        />
      </div>
    )
  }

  handleUpdate = async () => {
    await this.props.updateConfigMutation({
      variables: {
        configId: this.state.id,
        configData: this.state.data,
      }
    })
    this.props.configQuery.refetch()
  }
}

const UPDATE_CONFIG_MUTATION = gql`
  mutation UpdateConfig($configId: ID!, $configData: Json!) {
    updateConfig(id: $configId, data: $configData) {
      id
    }
  }
`

const CONFIG_QUERY = gql`
  query ConfigQuery {
    allConfigs {
      id
      data
    }
  }
`

export default withStyles(styles)(withRouter(compose(
  graphql(CONFIG_QUERY, {
    name: 'configQuery',
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(UPDATE_CONFIG_MUTATION, {
    name: 'updateConfigMutation'
  })
)(Config)))
