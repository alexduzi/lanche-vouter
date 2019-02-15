import React, { Component } from "react";
import { Input, Button, Card, Row, Col } from "antd";
import axios from "axios";

const { Meta } = Card;

class RestaurantCrud extends Component {
  state = {
    restaurantName: "",
    restaurantImageUrl: undefined,
    loading: false
  };

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
        >
          <Meta title={this.state.restaurantName} description={""} />
        </Card>
      );

    return undefined;
  };

  onChangeRestaurantImageHandler = e => {
    this.setState({ restaurantImageUrl: e.target.value });
  };

  onClickSaveRestaurantHandler = () => {
    this.setState({
      loading: true
    });

    axios
      .post("", {})
      .then(res => {
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { loading } = this.state;
    return (
      <Row type="flex" justify="center" align="middle">
        <Row order={1}>
          <Col>
            <Input placeholder="Nome do restaurante" size="large" />
          </Col>
        </Row>
        <Row order={2}>
          <Col>
            <Input
              placeholder="Imagem do restaurante"
              size="large"
              onChange={this.onChangeRestaurantImageHandler}
            />
          </Col>
        </Row>
        <Row order={3}>
          <Col>{this.renderRestaurantImage()}</Col>
        </Row>
        <Row order={4}>
          <Col>
            <Button
              type="primary"
              size="large"
              onClick={this.onClickSaveRestaurantHandler}
              loading={loading}
            >
              Cadastrar
            </Button>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default RestaurantCrud;
