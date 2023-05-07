const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: 'yassitoos@gmail.com',
      pass: 'fbzhklvycgobfbcu'
    }
  });
module.exports = transporter;
