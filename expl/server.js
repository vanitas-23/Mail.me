const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import CORS module

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

app.post('/send-email', (req, res) => {
  const { to, cc, subject, text } = req.body;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ashishchoudhury7686@gmail.com', // Update with your Gmail account
      pass: 'ASHISH7686', // Update with your Gmail password
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'ashishchoudhury7686@gmail.com', // Update with your Gmail account
    to,
    cc,
    subject,
    text,
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error.stack); // Log full error stack
      return res.status(500).send('Failed to send email: ' + error.message);
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
