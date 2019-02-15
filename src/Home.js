import React, { Component } from "react";
import openSocket from "socket.io-client";
import { Row, Col, Icon, Input } from "antd";
import RestaurantList from "./RestaurantList";
import RestaurantPieChart from "./RestaurantPieChart";
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
      this.setState({ voteResult: data });
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

  render() {
    const {
      userName,
      voteResult: { message, partials }
    } = this.state;
    const suffix = userName ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;

    return (
      <div>
        {this.state.restaurants.length === 0 && !this.state.voteResult && (
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
        )}
        <br />
        {!this.state.voteResult && (
          <RestaurantList
            restaurants={this.state.restaurants}
            onVoteClickHandler={this.onVoteClickHandler}
          />
        )}
        {this.state.voteResult && <RestaurantPieChart partials={partials} />}
      </div>
    );
  }
}

export default Home;
