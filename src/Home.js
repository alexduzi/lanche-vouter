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
    loadingRestaurants: true,
    time: ''
  };
  

  componentWillMount() {
 
    socket.emit("name", "");

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

    socket.on("timer", data => {
      this.setState({time : data.countdown }) 
    });
  }

  onVoteClickHandler = rest => {
    socket.emit("vote", rest);
  };



  render() {
    if (!this.state.voteResult)
      return (
        <div>
                 <Row  type="flex" justify="center" >
          <h2 style={{color: 'white'}}>Final da votação em : {this.state.time}</h2>
          </Row>
        <RestaurantList
          restaurants={this.state.restaurants}
          onVoteClickHandler={this.onVoteClickHandler}
        />
             <Row type="flex" justify="center" >
        <footer className="footer"><b style={{color: 'white'}}>Made with</b> <Icon type="heart"  style={{color: 'red'}} theme="filled" /> <b style={{color: 'white'}}>by the Fin Team</b></footer>
       </Row>
        </div>
      );

    return <RestaurantPieChart partials={this.state.voteResult.partials} />;
    
  }
}

export default Home;
