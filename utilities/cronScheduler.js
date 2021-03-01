const express = require("express");
const cron = require("node-cron");
const email = require("./email/nodemailer");
const text = require("./text");

const message = {
  from: "elonmusk@tesla.com", // Sender address
  to: "to@email.com", // List of recipients
  subject: "Design Your Model S | Tesla", // Subject line
  text: "Have the most fun you can in a car. Get your Tesla today!", // Plain text body
};

// Instantiate Cron
//Every Minute
var task = cron.schedule("* * * * *", function () {
  //email.send(message);
  //text.send("9543935116", "Hello World!");
  console.log("Every Minute - Cron Job");
});

//Every Hour
var task = cron.schedule("0 * * * *", function () {
  console.log("Every Hour - Cron Job");
});

//Every Day at 5am
var task = cron.schedule("0 5 * * *", function () {
  console.log("Every Day at 5 am Cron Job");
});

//Every Week (Sunday at 5am)
var task = cron.schedule("0 5 * * 0", function () {
  console.log("Cron Job");
});

//module.exports = task;
