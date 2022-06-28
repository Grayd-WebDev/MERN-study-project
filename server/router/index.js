import RestaurantsController from "../api/restaurants.controller.js";
import ReviewsController from "../api/reviews.controller.js";
import express from "express";

const router = express.Router();

router.get("/restaurants", RestaurantsController.apiGetRestaurants);

router.put("/review", ReviewsController.apiUpdateReview);
router.post("/review", ReviewsController.apiCreateReview);
router.delete("/review", ReviewsController.apiDeleteReview);

export default router;
