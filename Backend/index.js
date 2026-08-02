const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Task = require("./models/Tasks");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const nodemailer = require("nodemailer");
const rateLimit=require('express-rate-limit');
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
//set up the ai
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
//rate limit for AI 5 min 2 request 
const ailimiter=rateLimit({
  windowMs:5*60*1000,
  max:2,
  message:{message:"Too many request please try again after 5 minutes",success:false}
})

const loginlimiter=rateLimit({
  windowMs:2*60*1000,
  max:10,
  message:{message:"Too many login attempts try again after few minutes"}
})

//create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});



//API key end-point
app.post("/api/gemini/test",ailimiter, async (req, res) => {
  const userSubject = req.body;
  const content = userSubject.subject;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `generate 5 short saq question about this topic ${content} just a questions no other things and give me in JSON format dont give me id only questions`,
    });
    let rawtext = response.text.trim();
    rawtext = rawtext
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();

    const parsedResult = JSON.parse(rawtext);

    res.send({ result: parsedResult, status: 200 });
  } catch (err) {
    res.send({ message: "try again later server is busy", status: 400 });
  }
});
app.post("/api/gemini/check", async (req, res) => {
  const userSubject = req.body;
  const content = userSubject.answers;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `${JSON.stringify(content)} is a set of questions and answers check this and give the output only Json format for each answers using true of false like {"result":["true/false",..]} no other data`,
    });
    let rawText = response.text.trim();
    rawText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();
    const parsedResult = JSON.parse(rawText);

    res.send({ result: parsedResult, status: 200 });
  } catch (err) {
    res.send({ message: "try again later server is busy", status: 400 });
  }
});

//For registretion/New user validation
app.post("/api/register", async (req, res) => {
  const userData = req.body;
  const find = await User.findOne({ email: userData.email });
  if (!find) {
    const securePass = await bcrypt.hash(userData.password, 10);
    const data = await User.create({
      email: userData.email,
      password: securePass,
      username: userData.username,
      securityKey: Math.floor(Math.random() * 1000),
    });
    //Add the default data to task
    const addTaskOfUser = await Task.create({
      email: userData.email,
    });
    //sends the email
    try {
      const info = await transporter.sendMail({
        from: '"LevelUp" souviktapu15@gmail.com', // sender address
        to: `${data.email}`, // list of recipients
        subject: "Security Pin mail", // subject line
        text: `Hello ${data.username}`, // plain text body
        html: `<p>Hello ${data.username},<br> Welcome to Our System to Levelup your skills <b>Your security pin is ${data.securityKey}</b> do not share your security pin</p><br><p><b>Also make sure to complete your task at given time</b></p>`, // HTML body
      });
    } catch (err) {
      res.send({ message: "Email not send", status:404 });
    }

    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});
//For Login validation and Security
app.post("/api/login",loginlimiter, async (req, res) => {
  const userData = req.body;
  const find = await User.findOne({ email: userData.email });
  if (find) {
    const isValid = await bcrypt.compare(userData.password, find.password);
    if (isValid) {
      return res.send({ success: true });
    }
    res.send({ success: false ,message:"Password mismatched"});
  } else {
    res.send({ message: "Not a previous User", isNew:true });
  }
});

//For user details and dashboard details (when the page loads)
app.post("/api/user/dashboard", async (req, res) => {
  const userData = req.body;
  const isVerified = await User.findOne({ securityKey: userData.pin });
  if (isVerified) {
    const getUserTask = await Task.findOne({ email: isVerified.email });

    
    try {
      const data = {
        email: isVerified.email,
        securityKey: isVerified.securityKey,
        username: isVerified.username,
        subject: getUserTask.subject,
        tasks: getUserTask.tasks,
        rank: getUserTask.rank,
        XP: getUserTask.XP,
      };
      res.send(data);
    } catch (err) {
      res.send({
        message: "There is a problem in fetching user details",
        status: 404,
      });
    }
  } else {
    res.send({ message: "Wrong security pin", success: false });
  }
});
//For save user dashboard Data
app.post("/api/user/dashboard/saveData", async (req, res) => {
  const userData = req.body;
  const addToUserData = await User.findOneAndUpdate(
    { email: userData.email },
    { $set: { username: userData.username } },
    { new: true },
  );
  const addTaskOfUser = await Task.findOneAndUpdate(
    { email: userData.email },
    {
      $set: {
        subject: userData.subject,
        tasks: userData.tasks,
        rank: userData.rank,
        XP: userData.XP,
      },
    },
    { new: true },
  );
  // console.log(
  //   new Date().toISOString().split("T")[0] === addTaskOfUser.tasks[0].time,
  // );

  res.send({ status: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
