import ReviewsDAO from "./dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const { restaurantId, text } = req.body;
      const review = text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();
      const reviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date
      );
      return res.status(200).json({ message: "success", reviewResponse });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "error", error });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const text = req.body.text;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview({
        reviewId,
        userId,
        text,
        date,
      });

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update review - user may not be original poster"
        );
      }

      return res.status(200).json(reviewResponse);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.query.user_id;

      await ReviewsDAO.deleteReview(reviewId, userId);

      return res.json({ message: "The review was deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}
