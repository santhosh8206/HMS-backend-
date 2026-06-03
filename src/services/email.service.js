const transporter = require("../utils/nodemailer.util");

const sendBookingEmail = async (
  booking,
  pdfPath
) => {
  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: `Booking Confirmation - ${booking.bookingId}`,
    html: `
      <h2>Booking Confirmed</h2>
      <p>Dear ${booking.name},</p>
      <p>Your booking has been confirmed.</p>
    `,
    attachments: [
      {
        filename: `Booking-${booking.bookingId}.pdf`,
        path: pdfPath,
      },
    ],
  });
};

module.exports = {
  sendBookingEmail,
};