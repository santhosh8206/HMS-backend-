require("dotenv").config();
const axios = require("axios");

async function sendTemplate() {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: "919360526375",
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US"
          }
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
      "SUCCESS =>",
      JSON.stringify(response.data, null, 2)
    );
  } catch (error) {
    console.error(
      "ERROR =>",
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );
  }
}

sendTemplate();