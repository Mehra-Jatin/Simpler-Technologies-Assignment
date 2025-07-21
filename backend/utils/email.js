import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Simpler Auth",
};

const verificationEmailHTML = (verificationCode) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f6f9fc;
      padding: 40px 20px;
      margin: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 480px;
      margin: auto;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h2 {
      margin: 0;
      color: #333;
    }
    .code-box {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 4px;
      text-align: center;
      color: #2b6cb0;
      background: #edf2f7;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .message {
      font-size: 16px;
      text-align: center;
      color: #555;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 13px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Simpler Verification</h2>
    </div>
    <div class="message">
      <p>Use the verification code below to complete your sign up process:</p>
    </div>
    <div class="code-box">
      ${verificationCode}
    </div>
    <div class="message">
      <p>This code will expire in 24 hours. Do not share it with anyone.</p>
    </div>
    <div class="footer">
      If you didn't request this, please ignore this message.
    </div>
  </div>
</body>
</html>
`;

export const sendVerificationEmail = async (to, verificationCode) => {
  try {
    console.log(`Sending verification email to ${to} with code ${verificationCode}`);

    const info = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to,
      subject: "Email Verification",
      text: `Your verification code is ${verificationCode}`,
      html: verificationEmailHTML(verificationCode),
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};
