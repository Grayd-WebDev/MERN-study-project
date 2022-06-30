import RestaurantsDAO from "./dao/restaurantsDAO.js";

export default class RestaurantController {
  static async apiGetRestaurants(req, res, next) {
    const { restaurantsPerPage, restaurantsPage, cuisine, zipcode, name } =
      req.query;

    const perPage = restaurantsPerPage ? parseInt(restaurantsPerPage, 10) : 0;
    const page = restaurantsPage ? parseInt(restaurantsPage, 10) : 0;

    let filters = {};

    if (cuisine) {
      filters.cuisine = cuisine;
    } else if (zipcode) {
      filters.zipcode = zipcode;
    } else if (name) {
      filters.name = name;
    }

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDAO.getRestaurants({ filters, page, perPage });
   
      const response = {
      restaurants: restaurantsList,
      page,
      filters,
      entries_per_page: perPage,
      total_results: totalNumRestaurants,
    };

    return res.status(200).json(response);
  }
}
