const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({ limit: "10mb" })); // Increase limit for large images
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { email, image } = req.body;
  console.log("SEND EMAIL WORKS", { email, image });

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "resend",
      pass: "re_iaTedeVX_DbQHqnd6r57zQf9oWWU6qo4f",
    },
  });


  // Email options
  let mailOptions = {
    from: "test@resend.dev",
    to: email,
    subject: "Your Chart Image",
    text: "Please find your chart image attached.",
    attachments: [
      {
        filename: "chart.png",
        content: image.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.log({ error });
    res.status(500).send("Failed to send email.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});