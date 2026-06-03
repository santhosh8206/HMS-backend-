const prisma = require("../config/db");
const fs = require("fs").promises; // Used for non-blocking local file deletion
const uploadPdfToCloudinary = require("../utils/uploadPdfToCloudinary");
const generateBookingPdf = require("../utils/generateBookingPdf");
const uploadPdfToMeta = require("../utils/uploadPdfToMeta");
const sendWhatsappMessage = require("../utils/sendWhatsappMessage");
const { sendBookingEmail, } = require("../services/email.service");

const createBooking = async (data) => {
  const bookingId = "HTL" + Date.now();

  const booking = await prisma.booking.create({
    data: {
      bookingId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      roomId: data.roomId,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
      amount: data.amount,
      bookingStatus: "confirmed",
      paymentStatus: "pending",
    },
  });

  // Run document handling asynchronously in the background
  processBookingDocuments(booking);

  return booking;
};

const processBookingDocuments = async (booking) => {
  let pdfPath = null;

  try {
    // 1. Generate local PDF file
    pdfPath = await generateBookingPdf(booking);
    console.log("PDF PATH =>", pdfPath);

    // 2. Backup/Upload PDF to Cloudinary for long-term storage
    const pdfUrl = await uploadPdfToCloudinary(pdfPath);
    console.log("PDF URL =>", pdfUrl);

    // 3. Save Cloudinary URL in DB record
    await prisma.booking.update({
      where: { id: booking.id },
      data: { pdfUrl },
    });
    // sending email with attachment
    await sendBookingEmail(
      booking,
      pdfPath
    );

    console.log(
      "Booking Email Sent Successfully"
    );
    // 4. Upload the local document directly to Meta Media API
    const mediaId = await uploadPdfToMeta(pdfPath);

    // 5. Fire WhatsApp message via media ID
    await sendWhatsappMessage(booking.phone, mediaId);
    console.log("WhatsApp Sent Successfully via Meta Media ID");



  } catch (error) {
    console.error(
      "Background Process Error =>",
      error.response?.data || error.message
    );
  } finally {
    // 6. ALWAYS cleanup the local server file system
    if (pdfPath) {
      try {
        await fs.unlink(pdfPath);
        console.log("SUCCESS: Local temporary PDF cleaned up.");
      } catch (unlinkError) {
        console.error("WARNING: Failed to delete local temp file:", unlinkError.message);
      }
    }
  }
};

module.exports = {
  createBooking,
};