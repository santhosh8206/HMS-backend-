
  const bookingService = require("../services/bookingService");

  const createBooking = async (req, res) => {
    try {

      const result =
        await bookingService.createBooking(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });

    } catch (error) {
    console.log("ERROR =>", error);

    res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
    
  module.exports = {
    createBooking,
  };

