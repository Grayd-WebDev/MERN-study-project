import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = conn.db(process.env.REVIEWS_NS).collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      reviewDoc = {
        restaurant_id: restaurantId,
        name: user.name,
        text: review,
        date,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { e };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          user_id,
          _id: ObjectId(reviewId),
        },
        {
          $set: { text, date },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review ${e}`);
      return { e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const reviewResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return reviewResponse;
    } catch (e) {
      console.error(`Unable to delete review ${e}`);
      return { e };
    }
  }
}
