import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Stats } from './components/stats';
import { Scenes } from './components/scenes';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Performers } from './components/performers';

const client = new ApolloClient({
  uri: "http://192.168.1.200:9998/graphql"
});

const routes = [
    {
      path: "/",
      component: Stats
    },
    {
      path: "/scenes",
      component: Scenes,
      routes: [
        // {
        //   path: "/tacos/bus",
        //   component: Bus
        // },
        // {
        //   path: "/tacos/cart",
        //   component: Cart
        // }
      ]
    },
    {
      path: "/performers",
      component: Performers,
    }
  ];

ReactDOM.render((
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
      <Switch>
        <Route exact path="/" component={Stats} />
        <Route path="/scenes" component={Scenes} />
        <Route path="/performers" component={Performers} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
