import RestaurantsController from "../api/restaurants.controller.js";
import express from "express";

const router = express.Router();

router.get("/restaurants", RestaurantsController.apiGetRestaurants);

export default router;
