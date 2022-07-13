import mongodb from "mongodb";

const { ObjectId } = mongodb;
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (error) {
      console.error(
        `Unable to establish collection handles in userDAO: ${error}`
      );
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        restaurant_id: ObjectId(restaurantId),
        user_id: user._id,
        text: review,
        date,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (error) {
      console.error(`Unable to post review: ${error}`);
      throw new Error(error);
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { text, date } }
      );
      return updateResponse;
    } catch (error) {
      console.error(`Unable to update review: ${error}`);
      return { error };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      console.log(reviewId, userId);
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });
      console.log(deleteResponse);
      if (deleteResponse.deletedCount === 0)
        throw new Error("Something went wrong while deleting!");

      return deleteResponse;
    } catch (error) {
      console.error(`Unable to delete review: ${error}`);
      throw new Error(error);
    }
  }
}