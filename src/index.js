import React from "react";
import { render } from "react-dom";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";
import Code from "./components/Code";
import client from "./client";

render(
  <Router>
    <ApolloProvider client={client}>
      <Route exact path="/" component={App} />
      <Route path="/code" component={Code} />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
