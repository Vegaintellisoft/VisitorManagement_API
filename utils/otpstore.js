// otpStore.js
const otpMap = new Map(); // key: userId or phone/email, value: { otp, expiresAt }

function storeOtp(key, otp, ttl = 5 * 60 * 1000) { // default 5 minutes
  const expiresAt = Date.now() + ttl;
  otpMap.set(key, { otp, expiresAt });
}

function verifyOtp(key, otp) {
  const data = otpMap.get(key);
  if (!data) return false;
  if (Date.now() > data.expiresAt) {
    otpMap.delete(key);
    return false; // expired
  }
  if (data.otp === otp) {
    otpMap.delete(key); // remove after successful verification
    return true;
  }
  return false;
}

module.exports = {
  storeOtp,
  verifyOtp,
};
