const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 4000;

const url =
  "mongodb+srv://rajputanubhav65:Nlb0ly5wMl5CJZaw@anubhav.ao38e61.mongodb.net/";
const databasename = "Dashboard";

app.use(cors());

app.get("/fetchData", async (req, res) => {
  let client;

  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(databasename);
    const collection = db.collection("student");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  } finally {
    if (client) {
      client.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
