const Sib = require("sib-api-v3-sdk");
const path = require("path");
const { createTransport } = require("nodemailer");
const User = require("../models/user");
const ForgotUser = require("../models/forgotpassword");
const { v4: uuidv4 } = require("uuid");

exports.forgotpassword = async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email,
    });
    console.log(result);
    const uuid = uuidv4();
    console.log(uuid);
    if (result !== null) {
      const obj = {
        UserId: result.id,
        active: true,
        id: uuid,
      };
      console.log(obj);
      const forgotResult = await ForgotUser.create(obj);
      console.log("object created",forgotResult);
      const defaultClient = Sib.ApiClient.instance;

      const apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
      console.log(`forget 10`);
      console.log("this is the api key",process.env.SENDINBLUE_API_KEY);

      const transporter = createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
          user: "DAEMOSARES@GMAIL.COM",
          pass: process.env.SENDINBLUE_SMTP_KEY,
        },
      });
      console.log(req.body.email);
      const mailOptions = {
        from: "daemosares@gmail.com",
        to: req.body.email,
        subject: `Your subject`,
        text: `Your reset link is - http://localhost:4000/password/resetpassword/${uuid}

        This is valid for 1 time only.`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.json({ message: "A reset link send to your email id" });
        }
      });
    } else {
      res.json({ message: "Invalid email id", status: 501 });
    }
  } catch (error) {
    console.log(error);
  }
};