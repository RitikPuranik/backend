const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'rideemasinghjbp@gmail.com', 
      pass: 'nfbb efud xedf hxoc', 
    },
  });

  const mailOptions = {
    from: 'rideemasinghjbp@.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
