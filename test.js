const { sendVerificationEmail } = require('./services/emailService'); // Adjust the path to your module

const recipientEmail = 'paulangelomayordo@gmail.com'; // Replace with the recipient's email address
const verificationToken = 'your_verification_token'; // Replace with an actual token

sendVerificationEmail(recipientEmail, verificationToken)
    .then(() => {
        console.log('Verification email sent successfully!');
    })
    .catch((error) => {
        console.error('Error sending verification email:', error);
    });
