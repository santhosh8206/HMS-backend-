

// require("dotenv").config();
// const axios = require("axios");

// const sendWhatsappMessage = async (phone, mediaId, guestName) => {
//   try {
//     const whatsappNumber = `91${phone}`;

//     const payload = {
//       messaging_product: "whatsapp",
//       to: whatsappNumber,
//       type: "template",
//       template: {
//         name: "booking_confirmation_media", // Use your approved template name here
//         language: {
//           code: "en_US"
//         },
//         components: [
//           {
//             type: "header",
//             parameters: [
//               {
//                 type: "document",
//                 document: {
//                   id: mediaId, // Pass the Meta media ID here
//                   filename: "BookingConfirmation.pdf"
//                 }
//               }
//             ]
//           },
//           {
//             type: "body",
//             parameters: [
//               {
//                 type: "text",
//                 text: guestName // Fills the {{1}} variable in your body text
//               }
//             ]
//           }
//         ]
//       }
//     };

//     console.log("SENDING TEMPLATE PAYLOAD =>", JSON.stringify(payload, null, 2));

//     const response = await axios.post(
//       `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("TEMPLATE RESPONSE =>", JSON.stringify(response.data, null, 2));
//     return response.data;

//   } catch (error) {
//     console.error("Template Send Error =>", error.response?.data || error.message);
//     throw error;
//   }
// };

// module.exports = sendWhatsappMessage;
require("dotenv").config();
const axios = require("axios");

const sendWhatsappMessage = async (phone) => {
  const formattedPhone = phone.startsWith("91")
    ? phone
    : `91${phone}`;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("WhatsApp Sent:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "WhatsApp Error:",
      JSON.stringify(error.response?.data, null, 2)
    );
    throw error;
  }
};
module.exports = sendWhatsappMessage;