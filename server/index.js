import mongodb from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";

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
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });