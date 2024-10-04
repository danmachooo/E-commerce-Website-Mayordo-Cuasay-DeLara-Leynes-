const nodemailer = require('nodemailer');

// Configure your email transport options
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your_email@example.com', // Your email address
        pass: 'your_password' // Your email password
    }
});

const sendVerificationEmail = (email, verificationToken) => {
    const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;

    const mailOptions = {
        from: '"Your E-commerce" <your_email@example.com>', // Sender address
        to: email, // List of recipients
        subject: 'Email Verification', // Subject line
        text: `Please verify your email by clicking the link: ${verificationLink}`, // Plain text body
        html: `<p>Please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>` // HTML body
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
