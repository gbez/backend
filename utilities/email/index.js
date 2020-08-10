const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Transporter is online and ready to send messages");
    }
  });
  // 2) Define email options
  const mailOptions = {
    from: "Grant Besner <gmbmonkeyvp@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) Send email
  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = sendEmail;
