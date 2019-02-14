import React from "react";
import { Col, Card, Icon } from "antd";
const { Meta } = Card;

export default ({ rest, onVoteClickHandler }) => {
  return (
    <Col>
      <Card
        hoverable={true}
        className="animated fadeIn"
        span={4}
        style={{ width: 300, margin: 10 }}
        cover={
          <img
            style={{ width: `100%`, height: `200px` }}
            alt="restaurante"
            src={rest.url}
          />
        }
        actions={[
          <Icon type="check" onClick={() => onVoteClickHandler(rest)} />
        ]}
      >
        <Meta title={rest.name} description={rest.description} />
      </Card>
    </Col>
  );
};
