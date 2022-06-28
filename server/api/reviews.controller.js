import ReviewsDAO from "./dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiCreateReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const name = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body._id,
      };
      const data = new Date();

      const ReviewResponse = await ReviewsDAO.addReview({
        restaurantId,
        userInfo,
        name,
        data,
      });

      return res.status(200).json({ status: ReviewResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const { reviewId, text, userId } = req.body;

      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview({
        reviewId,
        userId,
        text,
      });

      const { error } = reviewResponse;
      if (error) {
        return res.status(400).json({ error });
      }
      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update review - user may not be original poster!"
        );
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;

      const reviewResponse = await ReviewsDAO.deleteReview({
        reviewId,
        userId,
      });

      return res.status(200).json({ stauts: "success" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
