const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});


/* task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log(error);
  }); 


const me = new User({
  name: "Mariana",
  email: "foo@bar.com",
  password: "estaesmicontrasena",
  age: 29,
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("error", error);
  });
*/