import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import RestaurantService from "../services/RestaurantService";

const RestaurantsList = () => {
  const [searchCuisine, setSearchCuisine] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [cuisines, setCuisines] = useState([]);

  const getRestaurants = (page = 1) => {
    RestaurantService.getAll(page).then((res) => {
      setRestaurants(res.data.restaurants);
    });
  };
  const getCuisines = (page = 1) => {
    RestaurantService.getCuisines().then((res) => {
      setCuisines(res.data.cuisines);
    });
  };

  const find = (query, by) => {
    RestaurantService.find(query, by).then((res) => {
      console.log(res.data.restaurants);
      setRestaurants(res.data.restaurants);
    });
  };

  const onChangeSearchCuisine = (e) => {
    setSearchCuisine(e.target.value);
  };
  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };
  const onChangeSearchZip = (e) => {
    setSearchZip(e.target.value);
  };

  useEffect(() => {
    find(searchName, "name");
  }, [searchName]);

  useEffect(() => {
    find(searchZip, "zipcode");
  }, [searchZip]);

  useEffect(() => {
    find(searchCuisine, "cuisine");
  }, [searchCuisine]);

  useEffect(() => {
    getRestaurants();
    getCuisines();
  }, []);

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <div>
          <input
            className="form-control form-control-lg"
            placeholder="Restaurant name"
            onChange={onChangeSearchName}
            value={searchName}
            type="text"
          />
        </div>
        <div>
          <input
            className="form-control form-control-lg"
            placeholder="Restaurant zip"
            onChange={onChangeSearchZip}
            value={searchZip}
            type="text"
          />
        </div>
        <div>
          <select
            onChange={onChangeSearchCuisine}
            className="form-select form-select-lg"
          >
            {cuisines.map((cuisine) => {
              return <option value={cuisine}>{cuisine.substr(0, 20)}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="restaurants-container d-flex flex-row justify-content-between flex-wrap">
        {restaurants.map((res) => {
          const address = `${res.address.building} ${res.address.street}, ${res.address.zipcode}`;
          return (
            <div
              class="card border-success mb-3 mt-4 p-2"
              style={{ width: "30%" }}
            >
              <div class="card-body text-success">
                <h5 class="card-title">{res.name}</h5>
                <p class="card-text">{res.cuisine}</p>
              </div>
              <div class="card-footer bg-transparent border-success">
                <a href={"https://www.google.com/maps/place/" + address}>
                  {address}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
