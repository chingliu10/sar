import nodemailer from "nodemailer"
import express from "express"
import hbs from "hbs"



const app = express();

app.set("view engine", "hbs")
app.use(express.static("assets"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.render("index");
})

const sendMailHandler = async (req, res) => {
    const { subject, message, phone, name, email } = req.body;
  
    if (!subject || !message || !phone || !name || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    try {
      const transporter = nodemailer.createTransport({
        host: "mail.sar.co.tz", // Your SMTP server
        port: 587, // Port for TLS
        secure: false, // Set to true if you use port 465
        auth: {
          user: "info@sar.co.tz", // Your email address
          pass: "12345", // Your email password
        },
      });
  
      const mailOptions = {
        from: "info@sar.co.tz",
        to: "md@sar.co.tz",
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #16243D; border-bottom: 2px solid #16243D; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
      
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #16243D; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
      
            <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee;">
              <em>Sent from: Solutions AR Insurance Broker website contact form</em>
            </p>
          </div>
        `,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  };
  
  app.post("/send-mail", sendMailHandler);

app.listen(8000, () =>
  console.log('Example app listening on port 3000!'),
);