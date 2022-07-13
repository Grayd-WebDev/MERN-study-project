import http from "../helpers/httpCommon";

export default class RestaurantService {
  static get(id) {
    return http.get(`/id/${id}`);
  }

  static getAll(page) {
    return http.get(`?page=${page}`);
  }

  static find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  static createOrUpdateReview(data, isEditing = false) {
    console.log("createOrUpdateReview",data, isEditing);
    if (isEditing) return http.put("/review", data);

    return http.post("/review", data);
  }

  static deleteReview(id, userId) {
    console.log(userId);
    return http.delete(`/review?id=${id}&user_id=${userId}`, {
      data: { user_id: userId },
    });
  }

  static getCuisines() {
    return http.get("/cuisines");
  }

  static getZipcodes() {
    return http.get("/zipcodes");
  }
}
