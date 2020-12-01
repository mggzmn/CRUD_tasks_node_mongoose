const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
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