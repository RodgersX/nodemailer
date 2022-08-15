const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: { user: process.env.EMAIL, pass: process.env.PASS },
});

transporter.verify((err, _) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mail = {
    from: email,
    to: process.env.EMAIL,
    subject: subject,
    text: `${name} <${email}> \n${message}`,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.status(500).json({ message: "something went wrong!" });
    } else {
      res.status(200).json({ message: "email successfully sent to recipient" });
    }
  });
});
