export const generateOtp = () => {
  const otp = Math.random().toString(36).slice(-5).toUpperCase();
  return otp;
};
