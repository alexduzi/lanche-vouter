import React, { Component } from "react";
import { Form, Input, Button, Card, Row, Col } from "antd";
import RestaurantList from "./RestaurantList";
import _ from "lodash";
import openSocket from "socket.io-client";

const socket = openSocket(process.env.REACT_APP_PUBLIC_URL, {
  secure: true
});

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 6,
      offset: 8
    },
    sm: {
      span: 6,
      offset: 8
    }
  }
};

class RestaurantCrud extends Component {
  state = {
    restaurantName: "",
    restaurantImageUrl: undefined,
    loading: false,
    restaurants: []
  };

  componentWillMount() {
    socket.emit("name", "");

    socket.on("restaurant", data => {
      console.log(data);
      this.setState({
        restaurants: _.chunk(data, 3),
        loading: false
      });
    });
  }

  renderRestaurantImage = () => {
    if (this.state.restaurantImageUrl)
      return (
        <Card
          hoverable={true}
          className="animated fadeIn"
          span={4}
          style={{ width: 300, margin: 10 }}
          cover={
            <img
              style={{ width: `100%`, height: `200px` }}
              alt="restaurante"
              src={this.state.restaurantImageUrl}
            />
          }
        />
      );

    return undefined;
  };

  onChangeRestaurantImageHandler = e => {
    this.setState({ restaurantImageUrl: e.target.value });
  };

  onClickSaveRestaurantHandler = () => {
    const { restaurantName, restaurantImageUrl } = this.state;

    if (!restaurantName || restaurantName === "") {
      alert("preencha o nome do restaurante!");
    }

    if (!restaurantImageUrl || restaurantImageUrl === "") {
      alert("coloque uma imagem para o restaurante!");
    }

    this.setState({
      loading: true
    });
    console.log("onClickSaveRestaurantHandler");
    socket.emit("addRestaurant", { restaurantName, restaurantImageUrl });

    this.setState({
      restaurantName: "",
      restaurantImageUrl: ""
    });
  };

  onchangeRestaurantNameHandler = e => {
    this.setState({ restaurantName: e.target.value });
  };

  removeRestaurantHandler = restaurant => {
    socket.emit("removeRestaurant", restaurant);
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Form type="flex" justify="center" align="middle">
          <Form.Item {...formItemLayout} label="Nome do restaurante">
            <Input
              placeholder="Nome do restaurante"
              size="large"
              onChange={this.onchangeRestaurantNameHandler}
              value={this.state.restaurantName}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Imagem do restaurante">
            <Input
              placeholder="Imagem do restaurante"
              size="large"
              onChange={this.onChangeRestaurantImageHandler}
              value={this.state.restaurantImageUrl}
            />
          </Form.Item>
          <Row order={3}>
            <Col>{this.renderRestaurantImage()}</Col>
          </Row>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              size="large"
              onClick={this.onClickSaveRestaurantHandler}
              loading={loading}
            >
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
        <br />
        <RestaurantList
          restaurants={this.state.restaurants}
          removeRestaurant={this.removeRestaurantHandler}
        />
      </div>
    );
  }
}

export default RestaurantCrud;
