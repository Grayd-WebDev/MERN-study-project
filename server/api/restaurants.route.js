import express from "express";
import RestaurantController from "./restaurants.controller.js";
const router = express.Router();

router.get("/", RestaurantController);

export default router;
