import React, { Component } from "react";
import openSocket from "socket.io-client";
import { Row, Col, Icon, Input } from "antd";
import RestaurantCard from "./RestaurantCard";
import { PieChart, Pie } from "recharts";
import _ from "lodash";
import "antd/dist/antd.css";
import "./animated.css";

const socket = openSocket("https://melhorhoradodia.herokuapp.com", {
  secure: true
});

class Home extends Component {
  state = {
    userName: "",
    restaurants: [],
    voteResult: undefined
  };

  componentWillMount() {
    socket.on("userJoined", data => {
      console.log("userJoined", data);
    });

    socket.on("restaurant", data => {
      console.log(data);
      this.setState({
        restaurants: _.chunk(data, 3)
      });
    });

    socket.on("userVoted", data => {
      console.log(data);
      this.setState({ voteResult: data });
    });

    socket.on("userVotedRejected", data => {
      console.log(data);
      alert(data);
    });
  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: "" });
  };

  onChangeUserName = e => {
    this.setState({ userName: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      socket.emit("name", this.state.userName);
      this.setState({ userName: "" });
    }
  };

  onVoteClickHandler = rest => {
    socket.emit("vote", rest);
  };

  renderRestaurants = () => {
    return this.state.restaurants.map((restaurants, index) => {
      return (
        <Row type="flex" justify="center" key={index}>
          {restaurants.map((rest, idx) => {
            return (
              <RestaurantCard
                key={rest.id}
                rest={rest}
                onVoteClickHandler={this.onVoteClickHandler}
              />
            );
          })}
        </Row>
      );
    });
  };

  renderVotes = () => {
    return (
      <PieChart width={730} height={250}>
        <Pie
          data={[]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
        <Pie
          data={[]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
      </PieChart>
    );
  };

  render() {
    const { userName } = this.state;
    const suffix = userName ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;

    return (
      <div>
        {this.state.restaurants.length === 0 ? (
          <Row type="flex" justify="center">
            <Col span={4}>
              <Input
                placeholder="'Entri com seu nomi'"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                suffix={suffix}
                value={userName}
                size="large"
                onKeyPress={this.handleKeyPress}
                onChange={this.onChangeUserName}
                ref={node => (this.userNameInput = node)}
              />
            </Col>
          </Row>
        ) : (
          this.renderRestaurants()
        )}
        <br />
      </div>
    );
  }
}

export default Home;
