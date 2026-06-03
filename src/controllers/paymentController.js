
const paymentService = require("../services/paymentService");

const verifyPayment = async (req, res) => {
  try {

    const result =
      await paymentService.verifyPayment(req.body);

    res.status(200).json(result);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  verifyPayment,
};

