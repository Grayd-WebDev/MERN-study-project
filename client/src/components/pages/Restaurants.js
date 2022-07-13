import React from "react";
import RestaurantsList from "../RestaurantsList";

const Restaurants = ({ user }) => {
  return (
    <>
      <h1>Restaurants</h1>
      <RestaurantsList user={user} />
    </>
  );
};

export default Restaurants;
