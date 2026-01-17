export const generateOpt = () => {
  const otp = Math.random().toString(36).slice(-5).toUpperCase();
  return otp;
};
