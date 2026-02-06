const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const ownerMail = process.env.EMAIL_USER;

    await transporter.sendMail({
      from: ownerMail,
      to: ownerMail,
      subject: `Website contact from ${name}`,
      text: `You received a new message from ${name} <${email}>:\n\n${message}`,
    });

    await transporter.sendMail({
      from: ownerMail,
      to: email,
      subject: 'Thanks for contacting',
      text: `Hi ${name},\n\nThanks for your message. I will get back to you soon.\n\n— Site owner`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Vercel API - email error:', error && (error.message || error));
    return res.status(500).json({ error: 'Failed to send email', details: error && error.message });
  }
};
