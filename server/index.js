import mongodb from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";
import RestaurantsDAO from "./api/dao/restaurantsDAO.js";
import ReviewsDAO from "./api/dao/reviewsDAO.js";
dotenv.config();

const MongoClient = mongodb.MongoClient;

const { PORT, DB_URI } = process.env;

const port = PORT || 8000;

MongoClient.connect(DB_URI, {
  maxPoolSize: 50,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
