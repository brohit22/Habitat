const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb+srv://rahul:rahul001@cluster0.uzoqy7q.mongodb.net/habit_tracker")
//   .then(() => console.log("Mongodb Connected"))
//   .catch((e) => console.log(e));

mongoose
  .connect("mongodb://127.0.0.1/myHabitat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));
