const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.WEBHOOK_VERIFY_TOKEN
  ) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

const receiveWebhook = (req, res) => {
  console.log(
    JSON.stringify(req.body, null, 2)
  );

  res.sendStatus(200);
};

module.exports = {
  verifyWebhook,
  receiveWebhook,
};