const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
const sendGridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(`${sendGridApiKey}`);


const sendMail = (msg) => {
  return sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
      console.log(response[0].body),"sendMail body: ";
      return response[0];
    })
    .catch((error) => {
      console.error("catch error: ", error?.response?.body);
    });
};

module.exports = { sendMail };
