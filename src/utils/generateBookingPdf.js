// // src/utils/generateBookingPdf.js

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");
// const os = require("os");

// const generateBookingPdf = async (booking) => {
//   let browser;

//   try {
//     browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });

//     const page = await browser.newPage();

//     const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8" />
//         <title>Booking Confirmation</title>

//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             padding: 40px;
//             color: #333;
//           }

//           .container {
//             max-width: 800px;
//             margin: 0 auto;
//           }

//           h1 {
//             text-align: center;
//             color: #2563eb;
//           }

//           .section {
//             margin-top: 20px;
//           }

//           .row {
//             margin-bottom: 12px;
//             font-size: 16px;
//           }

//           .label {
//             font-weight: bold;
//           }

//           hr {
//             margin: 20px 0;
//           }

//           .footer {
//             margin-top: 40px;
//             text-align: center;
//             color: #666;
//             font-size: 14px;
//           }
//         </style>
//       </head>

//       <body>
//         <div class="container">

//           <h1>Hotel Booking Confirmation</h1>

//           <hr />

//           <div class="section">

//             <div class="row">
//               <span class="label">Booking ID:</span>
//               ${booking.bookingId}
//             </div>

//             <div class="row">
//               <span class="label">Customer Name:</span>
//               ${booking.name}
//             </div>

//             <div class="row">
//               <span class="label">Phone:</span>
//               ${booking.phone}
//             </div>

//             <div class="row">
//               <span class="label">Room ID:</span>
//               ${booking.roomId}
//             </div>

//             <div class="row">
//               <span class="label">Check In:</span>
//               ${booking.checkIn}
//             </div>

//             <div class="row">
//               <span class="label">Check Out:</span>
//               ${booking.checkOut}
//             </div>

//             <div class="row">
//               <span class="label">Amount Paid:</span>
//               ₹${booking.amount}
//             </div>

//           </div>

//           <div class="footer">
//             Thank you for choosing our hotel.
//           </div>

//         </div>
//       </body>
//       </html>
//     `;

//     await page.setContent(html, {
//       waitUntil: "networkidle0",
//     });

//     const tempDir = path.join(
//       os.tmpdir(),
//       "hotel-bookings"
//     );

//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, {
//         recursive: true,
//       });
//     }

//     const pdfPath = path.join(
//       tempDir,
//       `${booking.bookingId}.pdf`
//     );

//     await page.pdf({
//       path: pdfPath,
//       format: "A4",
//       printBackground: true,
//     });

//     return pdfPath;
//   } catch (error) {
//     console.error(
//       "PDF Generation Error:",
//       error
//     );
//     throw error;
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// };

// module.exports = generateBookingPdf;


// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");
// const os = require("os");

// const generateBookingPdf = async (booking) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const tempDir = path.join(
//         os.tmpdir(),
//         "hotel-bookings"
//       );

//       if (!fs.existsSync(tempDir)) {
//         fs.mkdirSync(tempDir, { recursive: true });
//       }

//       const pdfPath = path.join(
//         tempDir,
//         `${booking.bookingId}.pdf`
//       );

//       const doc = new PDFDocument({
//         size: "A4",
//         margin: 50,
//       });

//       const stream = fs.createWriteStream(pdfPath);

//       doc.pipe(stream);

//       // Header
//       doc
//         .fontSize(24)
//         .fillColor("#2563eb")
//         .text("HOTEL BOOKING CONFIRMATION", {
//           align: "center",
//         });

//       doc.moveDown();

//       doc
//         .fontSize(12)
//         .fillColor("black")
//         .text(`Booking ID: ${booking.bookingId}`);

//       doc.text(
//         `Booked On: ${new Date().toLocaleString()}`
//       );

//       doc.moveDown();

//       // Guest Information
//       doc
//         .fontSize(16)
//         .text("Guest Details");

//       doc.moveDown(0.5);

//       doc.fontSize(12);

//       doc.text(`Guest Name: ${booking.name}`);
//       doc.text(`Phone Number: ${booking.phone}`);
//       doc.text(`Email: ${booking.email}`);

//       doc.moveDown();

//       // Hotel Details
//       doc
//         .fontSize(16)
//         .text("Hotel Details");

//       doc.moveDown(0.5);

//       doc.fontSize(12);

//       doc.text(
//         `Hotel Name: ${booking.hotelName || "Hotel HMS"}`
//       );

//       doc.text(
//         `Room Number: ${booking.roomId}`
//       );

//       doc.text(
//         `Check In: ${new Date(
//           booking.checkIn
//         ).toLocaleString()}`
//       );

//       doc.text(
//         `Check Out: ${new Date(
//           booking.checkOut
//         ).toLocaleString()}`
//       );

//       doc.moveDown();

//       // Fare Summary
//       doc
//         .fontSize(16)
//         .text("Fare Summary");

//       doc.moveDown(0.5);

//       doc.fontSize(12);

//       doc.text(
//         `Total Amount Paid: ₹${booking.amount}`
//       );

//       doc.moveDown();

//       // Divider
//       doc
//         .moveTo(50, doc.y)
//         .lineTo(550, doc.y)
//         .stroke();

//       doc.moveDown();

//       // Terms
//       doc
//         .fontSize(16)
//         .text("Important Information");

//       doc.moveDown(0.5);

//       doc.fontSize(11);

//       doc.text(
//         "• Guest must carry a valid Government ID proof."
//       );

//       doc.text(
//         "• Check-in time is 12:00 PM."
//       );

//       doc.text(
//         "• Check-out time is 11:00 AM."
//       );

//       doc.text(
//         "• Cancellation policies are applicable as per hotel rules."
//       );

//       doc.moveDown(2);

//       // Footer
//       doc
//         .fontSize(12)
//         .fillColor("#666666")
//         .text(
//           "Thank you for choosing our hotel.",
//           {
//             align: "center",
//           }
//         );

//       doc.text(
//         "We look forward to serving you again.",
//         {
//           align: "center",
//         }
//       );

//       doc.end();

//       stream.on("finish", () =>
//         resolve(pdfPath)
//       );

//       stream.on("error", reject);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// module.exports = generateBookingPdf;





const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");
const os = require("os");
const QRCode = require("qrcode");

const generateBookingPdf = async (booking) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tempDir = path.join(
        os.tmpdir(),
        "hotel-bookings"
      );

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, {
          recursive: true,
        });
      }

      const pdfPath = path.join(
        tempDir,
        `${booking.bookingId}.pdf`
      );

      const doc = new PDFDocument({
        margin: 40,
        size: "A4",
      });

      const stream = fs.createWriteStream(pdfPath);

      doc.pipe(stream);

      // =========================
      // HEADER
      // =========================

      if (booking.logoPath) {
        doc.image(
          booking.logoPath,
          40,
          30,
          {
            width: 120,
          }
        );
      }

      doc
        .fontSize(22)
        .fillColor("#2563eb")
        .text(
          "HOTEL BOOKING CONFIRMATION",
          180,
          40
        );

      // Status Badge

      doc
        .roundedRect(
          430,
          35,
          120,
          35,
          5
        )
        .fill("#16a34a");

      doc
        .fillColor("white")
        .fontSize(14)
        .text(
          booking.bookingStatus?.toUpperCase() ||
            "CONFIRMED",
          448,
          48
        );

      doc.moveDown(3);

      // =========================
      // BOOKING DETAILS
      // =========================

      sectionTitle(
        doc,
        "Booking Information"
      );

      doc
        .fillColor("black")
        .fontSize(11);

      doc.text(
        `Booking ID : ${booking.bookingId}`
      );

      doc.text(
        `Reference ID : ${
          booking.referenceId ||
          booking.bookingId
        }`
      );

      doc.text(
        `Booking Date : ${new Date().toLocaleString()}`
      );

      doc.moveDown();

      // =========================
      // HOTEL DETAILS
      // =========================

      sectionTitle(
        doc,
        "Hotel Information"
      );

      doc.text(
        `Hotel Name : ${
          booking.hotelName ||
          "Hotel HMS"
        }`
      );

      doc.text(
        `Address : ${
          booking.hotelAddress ||
          "Hotel Address"
        }`
      );

      doc.text(
        `Phone : ${
          booking.hotelPhone ||
          "N/A"
        }`
      );

      doc.moveDown();

      // =========================
      // GUEST DETAILS
      // =========================

      sectionTitle(
        doc,
        "Guest Information"
      );

      doc.text(
        `Guest Name : ${booking.name}`
      );

      doc.text(
        `Phone : ${booking.phone}`
      );

      doc.text(
        `Email : ${
          booking.email ||
          "N/A"
        }`
      );

      doc.moveDown();

      // =========================
      // STAY DETAILS TABLE
      // =========================

      sectionTitle(
        doc,
        "Stay Information"
      );

      await doc.table({
        headers: [
          "Check In",
          "Check Out",
          "Room",
          "Guests",
        ],

        rows: [
          [
            new Date(
              booking.checkIn
            ).toLocaleDateString(),

            new Date(
              booking.checkOut
            ).toLocaleDateString(),

            booking.roomType ||
              booking.roomId,

            `${booking.adults || 1} Adult(s)`
          ],
        ],
      });

      doc.moveDown();

      // =========================
      // FARE SUMMARY
      // =========================

      sectionTitle(
        doc,
        "Fare Summary"
      );

      await doc.table({
        headers: [
          "Description",
          "Amount",
        ],

        rows: [
          [
            "Room Charges",
            `₹${booking.amount}`,
          ],

          [
            "Taxes",
            "Included",
          ],

          [
            "Total Amount",
            `₹${booking.amount}`,
          ],
        ],
      });

      doc.moveDown();

      // =========================
      // QR CODE
      // =========================

      sectionTitle(
        doc,
        "Booking QR"
      );

      const qrPath = path.join(
        tempDir,
        `${booking.bookingId}-qr.png`
      );

      await QRCode.toFile(
        qrPath,
        JSON.stringify({
          bookingId:
            booking.bookingId,
          guest: booking.name,
        })
      );

      doc.image(
        qrPath,
        220,
        doc.y,
        {
          width: 120,
        }
      );

      doc.moveDown(8);

      // =========================
      // CANCELLATION POLICY
      // =========================

      sectionTitle(
        doc,
        "Cancellation Policy"
      );

      doc.fontSize(10);

      doc.text(
        "• Cancellation charges may apply based on hotel policy."
      );

      doc.text(
        "• Refunds are subject to hotel approval."
      );

      doc.text(
        "• Modifications are subject to room availability."
      );

      doc.moveDown();

      // =========================
      // IMPORTANT INFORMATION
      // =========================

      sectionTitle(
        doc,
        "Important Information"
      );

      doc.text(
        "• Carry valid Government ID proof."
      );

      doc.text(
        "• Standard Check-In: 12:00 PM"
      );

      doc.text(
        "• Standard Check-Out: 11:00 AM"
      );

      doc.text(
        "• Hotel reserves the right of admission."
      );

      doc.text(
        "• Local ID policies may apply."
      );

      doc.moveDown();

      // =========================
      // FOOTER
      // =========================

      doc
        .moveTo(40, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown();

      doc
        .fontSize(12)
        .fillColor("#666666")
        .text(
          "Thank you for choosing our hotel.",
          {
            align: "center",
          }
        );

      doc.text(
        "For support contact us anytime.",
        {
          align: "center",
        }
      );

      doc.end();

      stream.on(
        "finish",
        () => resolve(pdfPath)
      );

      stream.on(
        "error",
        reject
      );
    } catch (error) {
      reject(error);
    }
  });
};

function sectionTitle(
  doc,
  title
) {
  const y = doc.y;

  doc
    .rect(40, y, 515, 22)
    .fill("#2563eb");

  doc
    .fillColor("white")
    .fontSize(12)
    .text(
      title,
      50,
      y + 5
    );

  doc.moveDown(1.5);

  doc.fillColor("black");
}

module.exports =
  generateBookingPdf;