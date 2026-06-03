const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const uploadPdfToMeta = async (pdfPath) => {
  try {
    const stats = fs.statSync(pdfPath);
    console.log("PDF SIZE =>", stats.size, "bytes");

    const form = new FormData();
    form.append("file", fs.createReadStream(pdfPath), {
      filename: "BookingConfirmation.pdf",
      contentType: "application/pdf",
    });
    form.append("messaging_product", "whatsapp");

    // Updated to v25.0 for consistency
    const uploadResponse = await axios.post(
      `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/media`,
      form,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          ...form.getHeaders(),
        },
      }
    );

    const mediaId = uploadResponse.data.id;
    console.log("MEDIA ID =>", mediaId);

    // Verify uploaded media metadata
    const mediaInfo = await axios.get(
      `https://graph.facebook.com/v25.0/${mediaId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        },
      }
    );

    console.log("MEDIA INFO =>", JSON.stringify(mediaInfo.data, null, 2));
    return mediaId;
  } catch (error) {
    console.error("Meta Upload Error =>", error.response?.data || error.message);
    throw error;
  }
};

module.exports = uploadPdfToMeta;