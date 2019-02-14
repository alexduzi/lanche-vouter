import React, { Component } from "react";
import openSocket from "socket.io-client";
import { Row, Col, Icon, Input } from "antd";
import RestaurantCard from "./RestaurantCard";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import _ from "lodash";
import "antd/dist/antd.css";
import "./animated.css";

const COLORS = [
  "#0000FF",
  "#000080",
  "#FF00FF",
  "#800080",
  "#FF5733",
  "#36FF33",
  "#FF9C33",
  "#F3FF33",
  "#33B5FF",
  "#33FFCA",
  "#9633FF",
  "#FF339F"
];

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
    const {
      voteResult: { message, partials }
    } = this.state;

    const chartData = partials.map(item => {
      return { name: item.name, value: item.votes };
    });
    return (
      <PieChart width={window.outerWidth} height={window.outerHeight}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx={"50%"}
          cy={"20%"}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
        >
          {chartData.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" height={150} />
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
        {!this.state.voteResult && this.renderRestaurants()}
        {this.state.voteResult && this.renderVotes()}
      </div>
    );
  }
}

export default Home;
