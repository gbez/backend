const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

var mailtrapTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4319212a0e531c",
    pass: "978a9d2bde76be",
  },
});

exports.sendTest = (message) =>
  mailtrapTransport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

var gmailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gmbmonkeyvp@gmail.com",
    pass: "u8R3ndVb5pjyqvHBcs",
  },
});

exports.send = (message) => {
  gmailTransport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
