import React from "react";
import { Row } from "antd";
import RestaurantCard from "./RestaurantCard";

export default ({ restaurants, onVoteClickHandler, removeRestaurant }) => {
  return restaurants.map((restaurants, index) => {
    return (
      <Row type="flex" justify="center" key={index}>
        {restaurants.map((rest, idx) => {
          return (
            <RestaurantCard
              key={idx}
              hoverable={true}
              rest={rest}
              onVoteClickHandler={onVoteClickHandler}
              removeRestaurant={removeRestaurant}
            />
          );
        })}
      </Row>
    );
  });
};
