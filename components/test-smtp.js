import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "metrohostels.com", // your SMTP host
  port: 465, // usually 465 for SSL or 587 for TLS
  secure: true, // true for port 465, false for 587
  auth: {
    user: "contact@metrohostels.com", // your email
    pass: "w28Jk^f~{8k8", // your email password
  },
});

const mailOptions = {
  from: '"Metro Hostels" <contact@metrohostels.com>', // sender
  to: "contact@metrohostels.com", // receiver (you can use another test email)
  subject: "SMTP Test Email",
  text: "Hello! This is a test email to check SMTP configuration.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
