import React, { Component } from "react";
import Home from "./Home";
import Vote from "./Vote";
import { HashRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/vote" component={Vote} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
