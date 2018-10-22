import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'typeface-roboto';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router } from 'react-router-dom';
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

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
serviceWorker.unregister();
