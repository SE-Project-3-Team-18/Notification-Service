const nodemailer = require('nodemailer');

const emailConfig = require('../config/email')

class EmailService {
  static instance = null;

  constructor() {
    this.transporter = nodemailer.createTransport(emailConfig);
  }

  static getInstance() {
    if (EmailService.instance !== null) {
      return EmailService.instance;
    } else {
      EmailService.instance = new EmailService();
      return EmailService.instance;
    }
  }

  async sendEmail(to, subject, text) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: emailConfig.fromEmail,
        to: to,
        subject: subject,
        html: `<h1>${text}</h1>`,
      };

      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else if (
          info.rejected &&
          info.rejected.length > 0
        ) {
          reject(new Error('Email rejected'));
        } else {
          resolve(info.response);
        }
      });
    });
  }
}

module.exports = EmailService;
