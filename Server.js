import os from "os";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import DB_Connection from "./src/DB/DB.js";
import UserRouter from "./src/Route/User.js";
import EnquiryRouter from "./src/Route/Enquiry.js";
import ContactRouter from "./src/Route/User.js";
import FooterRouter from "./src/Route/Footer.js";
import FactAddRouter from "./src/Route/FactAddress.js";
import Catagoryrouter from "./src/Route/Product/Catagory.js";




dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Function to get the local IP address
function getLocalIP() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1"; // Fallback in case of no network connection
}

const localIP = getLocalIP();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", // add more if needed
  "http://localhost:8080", // add more if needed

  `http://${localIP}:5173`,
  `http://${localIP}:5174`,
  `http://${localIP}:8080`, // add more if needed
   // add more if needed
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ CORS: Not allowed by server"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/user', UserRouter);
app.use('/api/v1/enquiry', EnquiryRouter);
app.use('/api/v1/contact', ContactRouter);
app.use('/api/v1/footer', FooterRouter);
app.use('/api/v1/factAdd', FactAddRouter);
app.use('/api/v1/product/catagory', Catagoryrouter);









DB_Connection(process.env.DB_URI, process.env.DB_NAME)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(` ✅  Local:   http://localhost:${PORT}`);
      console.log(`✅ Server is running at http://${localIP}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
