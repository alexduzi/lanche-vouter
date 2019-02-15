import React, { Component } from "react";
import Home from "./Home";
import Vote from "./Vote";
import RestaurantCrud from "./RestaurantCrud";
import { HashRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import './index.css';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/vote" component={Vote} />
          <Route path="/restaurant-new" component={RestaurantCrud} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
