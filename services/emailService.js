const nodemailer = require('nodemailer');

// Configure your email transport options
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'johnpauldanmachi@gmail.com', // Your email address
        pass: 'iwbv qots bvxc gdzj' // Your email password or App Password
    }
});

const sendVerificationEmail = (email, verificationToken) => {
    const verificationLink = `http://localhost:3000/verify/${verificationToken}`;

    const mailOptions = {
        from: '"Furni" <johnpauldanmachi@gmail.com>', // Correctly format sender address
        to: email, // List of recipients
        subject: 'Email Verification', // Subject line
        text: `Please verify your email by clicking the link: ${verificationLink}`, // Plain text body
        html: `<p>Please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>` // HTML body
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
