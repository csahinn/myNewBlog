const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static dosyaları sunma
app.use(express.static(path.join(__dirname)));

// Rota: HTML dosyaları
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/blogs', (req, res) => {
    res.sendFile(path.join(__dirname, 'blogs.html'));
});

// Blog detay sayfaları
app.get('/blog-:name', (req, res) => {
    res.sendFile(path.join(__dirname, `blog-${req.params.name}.html`));
});

// Email yapılandırması
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validasyon
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Gönderene geri email gönder (confirmation)
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `We received your message - ${subject}`,
            html: `
                <h2>Thank you for contacting us!</h2>
                <p>Hi ${name},</p>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <hr>
                <p><strong>Your message:</strong></p>
                <p>${message}</p>
            `
        });

        // Sahibine email gönder
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email error:', error.message);
        console.error('Error details:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
