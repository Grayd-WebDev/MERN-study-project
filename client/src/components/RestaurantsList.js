import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RestaurantService from "../services/RestaurantService";

const RestaurantsList = ({ user }) => {
  const [searchCuisine, setSearchCuisine] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [zipcodes, setZipcodes] = useState([]);

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

  const getZipcodes = (page = 1) => {
    RestaurantService.getZipcodes().then((res) => {
      setZipcodes(res.data.zipcodes);
    });
  };

  const find = (query, by) => {
    RestaurantService.find(query, by).then((res) => {
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
    if (searchZip === "Any zipcodes") {
      getRestaurants();
    } else {
      find(searchZip, "zipcode");
    }
  }, [searchZip]);

  useEffect(() => {
    if (searchCuisine === "All cuisines") {
      getRestaurants();
    } else {
      find(searchCuisine, "cuisine");
    }
  }, [searchCuisine]);

  useEffect(() => {
    getRestaurants();
    getCuisines();
    getZipcodes();
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
          <select
            onChange={onChangeSearchZip}
            className="form-select form-select-lg"
          >
            {zipcodes.map((zipcode) => {
              return <option value={zipcode}>{zipcode.substr(0, 20)}</option>;
            })}
          </select>
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
          console.log("wee", user);
          return (
            <div
              class="card border-success mb-3 mt-4 p-2"
              style={{ width: "30%" }}
            >
              <div class="card-body text-success">
                <h5 class="card-title">{res.name}</h5>
                <p class="card-text">{res.cuisine}</p>
                <Link
                  to={`/restaurants/${res._id}`}
                  state={user}
                  type="button"
                  className="btn btn-primary"
                >
                  View Reviews
                </Link>
              </div>
              <div class="card-footer bg-transparent border-success">
                <a
                  target="_blank"
                  href={"https://www.google.com/maps/place/" + address}
                  rel="noreferrer"
                >
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
