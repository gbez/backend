//Import modules
const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
var cron = require("./utilities/cronScheduler");
dotenv.config({ path: "./config.env" });

//Load variables from process environment
const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;

//Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Succcessful!");
  });

// Instantiate server
const server = app.listen(port, () => {
  cron.start();
  console.log(`backend is waiting to take request on port: ${port}...`);
});
