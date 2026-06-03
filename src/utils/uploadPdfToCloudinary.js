const fs=require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPdfToCloudinary = async (pdfPath) => {

  const result = await cloudinary.uploader.upload(
    pdfPath,
    {
      resource_type: "raw",
      folder: "hotel-bookings",
      use_filename: true,
    }
  );

  console.log(result);


  return result.secure_url;
};

module.exports = uploadPdfToCloudinary;