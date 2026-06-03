
const transporter = require("./src/utils/nodemailer.util");

async function sendTestMail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "duke125santhosh@gmail.com",
      subject: "Nodemailer Test",
      text: "Email sent successfully from HMS 🚀",
    });

    console.log("Email Sent:", info.messageId);
  } catch (error) {
    console.error(error);
  }
}

sendTestMail();