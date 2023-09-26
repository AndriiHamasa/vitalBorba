const express = require("express");
// import cors from "cors"; 
const cors = require("cors")
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const app = express();
const port = process.env.PORT || 3000;

// Подключение библиотеки dotenv для загрузки переменных окружения из файла .env
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/submit-form", (req, res) => {
  const { name, phone } = req.body;
  console.log('name - ', name, "   ", "phone - ", phone)

  const { SENDGRID_API_KEY } = process.env;

  sgMail.setApiKey(SENDGRID_API_KEY);

  const emailSG = {
    to: "andrii.khamaza0@gmail.com",
    from: "andrii.khamaza@nure.ua",
    subject: "Test letter",
    html: `<p><strong>name: ${name}, phone: ${phone}</strong></p>`,
  };

  sgMail
    .send(emailSG)
    .then(() => {
      console.log("Email send success")
      res.status(200).json({ message: 'All is good' });
    })
    .catch((error) => console.log(error.message));

  

  
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
