import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'typeface-roboto';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjcol6bod1cuh0170hkw0xf51',
  request: operation => {
    const token = localStorage.getItem('newsToken');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    });
  }
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
serviceWorker.unregister();
