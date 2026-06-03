require("dotenv").config();

const axios = require("axios");

async function testText(phone) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: `91${phone}`,
        type: "text",
        text: {
          body: "Hotel Booking Test Message"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(
      JSON.stringify(response.data, null, 2)
    );
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );
  }
}

testText("9360526375");