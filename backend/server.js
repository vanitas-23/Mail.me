const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

// connectDb;
// Define a schema and model for the data
const connectDb = async ()=>{ 
    try{
            const connect=await mongoose.connect(process.env.CONNECTION_STRING);
            console.log("database connection established",connect.connection.host,connect.connection.name);
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
};
connectDb();
const dataSchema = new mongoose.Schema({
    name: String,
    id: String,
    category: String,
    text: String,
    to: String
});

const DataModel = mongoose.model('Data', dataSchema);


app.post('/send-email', (req, res) => {
    const { to, cc, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Replace with your email provider
        auth: {
            user: 'syedgdsc2023@gmail.com', // Replace with your email
            pass: 'Asdfghjkl233/' // Replace with your email password
        }
    });

    const mailOptions = {
        from:"syedgdsc2023@gmail",
        to,
        cc,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send email');
        }
        res.send('Email sent: ' + info.response);
    });
});

// Endpoint to save data to MongoDB
app.post('/save-data', async(req, res) => {
    const { name, id, category, text, to } = req.body;

    try {
        const newData = new DataModel({
            name,
            id,
            category,
            text,
            to
        });
    
        await newData.save();
        res.status(200).send({ status: 'success', message: 'Data saved to MongoDB', data: newData });
    } catch (error) {
        console.error(error);
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
