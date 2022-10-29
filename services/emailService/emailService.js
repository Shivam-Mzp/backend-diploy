const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const env = require("../../env");

var mainUser = nodemailer.createTransport(env.MAIL.TRANSPORT);

module.exports = async (senderEmail, subject, templateName, context) => {
  const sentEmailTemplateUser = {
    viewEngine: {
      partialsDir: path.join(__dirname),
      defaultLayout: false,
    },
    viewPath: path.join(__dirname),
  };

  mainUser.use("compile", hbs(sentEmailTemplateUser));

  context.faceBook = env.FACEBOOK_LINK;
  context.linkEdin = env.LINKEDIN_LINK;
  context.youTube = env.YOUTUBE_LINK;
  context.twittEr = env.TWITTER_LINK;
  context.disclaimer = env.DISCLAIMER;

  const sendMailUser = {
    from: `${env.MAIL.SENDERADDRESS} <${env.MAIL.TRANSPORT.auth.user}>`,
    to: senderEmail,
    subject: subject,
    template: templateName,
    context: context,
  };

  mainUser.sendMail(sendMailUser, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Email Sent Successfully: " + info.response);
  });
};
