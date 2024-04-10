require('dotenv').config();

const emailConfig = {
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME, // Your Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Your Gmail password or an app-specific password
  },
  fromEmail: 'noreply@instacommerce.com',
}

module.exports = emailConfig;
