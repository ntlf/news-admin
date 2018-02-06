import React, { Component } from 'react'
import Reboot from 'material-ui/Reboot'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import PrivateRoute from './PrivateRoute'
import { publicRoutes, privateRoutes } from '../routes'
import MiniDrawer from './MiniDrawer'

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjcol6bod1cuh0170hkw0xf51' })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('graphcoolToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


class App extends Component {
  render() {
    return (
      <div>
        <Reboot />
        <ApolloProvider client={apolloClient}>
          <Router basename="/news-admin">
            <MiniDrawer>
              <Switch>
                <Redirect
                  from='/'
                  to='/home'
                  exact />
                {publicRoutes.map((route, i) => (
                  <Route key={i} {...route} />
                ))}
                {privateRoutes.map((route, i) => (
                  <PrivateRoute key={i} {...route} />
                ))}
              </Switch>
            </MiniDrawer>
          </Router>
        </ApolloProvider>
      </div>
    )
  }
}

export default App
