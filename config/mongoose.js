const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/myHabitat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));
