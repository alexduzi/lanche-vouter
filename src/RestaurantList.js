import React from "react";
import { Row } from "antd";
import RestaurantCard from "./RestaurantCard";

export default ({ restaurants, onVoteClickHandler }) => {
  return restaurants.map((restaurants, index) => {
    return (
      <Row type="flex" justify="center" key={index}>
        {restaurants.map((rest, idx) => {
          return (
            <RestaurantCard
              key={rest.id}
              rest={rest}
              onVoteClickHandler={onVoteClickHandler}
            />
          );
        })}
      </Row>
    );
  });
};
