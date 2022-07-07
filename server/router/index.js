import RestaurantsController from "../api/restaurants.controller.js";
import ReviewsController from "../api/reviews.controller.js";
import express from "express";

const router = express.Router();

router.get("/", RestaurantsController.apiGetRestaurants);
router.get("/cuisines", RestaurantsController.apiGetCuisines);
router.get("/zipcodes", RestaurantsController.apiGetZipcodes);
router.get("/id/:id", RestaurantsController.apiGetOneRestaurant);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
