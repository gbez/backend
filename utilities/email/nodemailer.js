const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const hbs = require("nodemailer-express-handlebars");

var hbsOptions = {
  noEscape: true,
  viewEngine: {
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
    extname: ".hbs",
  },
  extName: ".hbs",
  viewPath: "utilities/email/views",
};

var mailtrapTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4319212a0e531c",
    pass: "978a9d2bde76be",
  },
});

mailtrapTransport.use("compile", hbs(hbsOptions));

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
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

gmailTransport.use("compile", hbs(hbsOptions));

exports.send = (message) => {
  gmailTransport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
