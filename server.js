const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Load variables from the process environment.
const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;

//Connect to Database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(
      "DB Connection Successful! Please be seated and we'll be happy to take your order!"
    );
  });

const server = app.listen(port, () => {
  console.log(`DimSumCart is waiting to take requests on port: ${port}...`);
});

process.on("unhandledRejection", err => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION...SHUTTING DOWN");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", err => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION...SHUTTING DOWN");
  server.close(() => {
    process.exit(1);
  });
});
