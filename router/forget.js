 let express=  require('express')
 let User=   require('../models/userModel')
 let router=   express.Router()
 const crypto = require('crypto');
 let bcrypt=require('bcryptjs');
let {sendEmail} = require('../utils/sendEmail')
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

  
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; 
    await user.save();


    const resetUrl = `${req.protocol}://${req.get('host')}/api/reset-password/${resetToken}`;
    await sendEmail(
      user.email,
      'Password Reset Request',
      `Click the link below to reset your password:\n\n${resetUrl}`
    );

    res.status(200).send('Password reset email sent');
  } catch (error) {
    res.status(500).send('Error sending password reset email: ' + error.message);
  }
});


// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passWord = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).send('Password reset successfully');
  } catch (error) {
    res.status(500).send('Error resetting password: ' + error.message);
  }
});
module.exports=router