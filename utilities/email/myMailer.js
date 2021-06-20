const email = require("./nodemailer");
const Relationship = require("../../models/relationshipModel");
const Blog = require("../../models/blogModel");
const catchAsync = require("../catchAsync");
const AppError = require("../../utilities/appError");

exports.sendNewsletterEmail = async (req, res, next) => {
  try {
    var recipients = await Relationship.find({
      newsletters: req.params.newsletter,
    });
    recipients.forEach(async function (recipient) {
      console.log(recipient);
      var message = {
        from: process.env.EMAIL_USERNAME,
        to: recipient.email,
        subject: req.body.subject,
        template: "hiking",
        context: {
          firstName: recipient.firstName,
          lastName: recipient.lastName,
          emailBody: req.body.emailBody,
        },
      };
      await email.send(message);
    });
    res.status(400).json({
      status: "success",
      message: `Newsletter email: "${req.body.subject}" sent to ${recipients.length} recipients.`,
    });
  } catch (err) {
    return next(
      new AppError("There was an error sending the newsletter emails", 500)
    );
  }
};
