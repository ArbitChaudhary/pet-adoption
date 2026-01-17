import nodemailer from "nodemailer";

interface SendMailProps {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ to, subject, html }: SendMailProps) => {
  const transporter = nodemailer.createTransport({ pool });
};
