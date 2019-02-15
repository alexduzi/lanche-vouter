import React, { Component } from "react";
import openSocket from "socket.io-client";
import { Row, Col, Icon, Input } from "antd";
import RestaurantList from "./RestaurantList";
import RestaurantPieChart from "./RestaurantPieChart";
import _ from "lodash";

import "./animated.css";
import { hidden } from "ansi-colors";

const socket = openSocket(process.env.REACT_APP_PUBLIC_URL, {
  secure: true
});

class Home extends Component {
  state = {
    userName: "",
    restaurants: [],
    voteResult: undefined,
    loadingRestaurants: true
  };

  componentWillMount() {
    socket.on("userJoined", data => {
      console.log("userJoined", data);
    });

    socket.on("restaurant", data => {
      console.log(data);
      this.setState({
        restaurants: _.chunk(data, 3),
        loadingRestaurants: false
      });
    });

    socket.on("userVoted", data => {
      console.log(data);
      this.setState({ voteResult: data });
    });

    socket.on("userVotedRejected", data => {
      console.log(data);
      this.setState({ voteResult: data });
    });
  }

  onVoteClickHandler = rest => {
    socket.emit("vote", rest);
  };

  render() {
    if (!this.state.voteResult)
      return (
        <RestaurantList
          restaurants={this.state.restaurants}
          onVoteClickHandler={this.onVoteClickHandler}
        />
      );

    return <RestaurantPieChart partials={this.state.voteResult.partials} />;
  }
}

export default Home;
