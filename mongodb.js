const mongodb = require("mongodb");
const assert = require("assert");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(databaseName);
    /*     db.collection("users").insertOne(
      {
        name: "Mariana",
        age: 29,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert");
        }
        console.log(result.ops);
      }
    ); */
    db.collection("tasks").insertMany(
      [
        {
          description: "This is the firts task",
          completed: true,
        },
        {
          description: "This is the second task",
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("unable");
        }
        console.log(result.ops);
      }
    );
  }
);
