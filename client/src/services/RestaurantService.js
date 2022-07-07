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

  static createReview(data) {
    return http.post("/review", data);
  }

  static updateReview(data) {
    return http.put("/review", data);
  }

  static deleteReview(id) {
    return http.delete(`/review?id=${id}`);
  }

  static getCuisines() {
    return http.get("/cuisines");
  }
}
