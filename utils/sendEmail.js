const nodemailer = require('nodemailer');

async function sendOTP(email, otp) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'venunastatussutuko@gmail.com',
      pass: 'ripvouwoxgkjucsg', // Use the app password without spaces
    },
  });

  const mailOptions = {
    from: `"Visitor Management OTP" <venunastatussutuko@gmail.com>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
    html: `<p>Your OTP code is <b>${otp}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOTP;
