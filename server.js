const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//Handling Uncaught Exception(Error)
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shutting Down The Server Due To  Uncaught Exception");
  // process.exit(1);   //for stop the server
});

//config
dotenv.config();

//connecting database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Port is running on ${process.env.PORT}`);
});

// console.log(youtube);  //Handling Uncaught Exception(Error)

//Unhandled Promise Rejection (Error)
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shutting Down The Server Due To Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
