import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Enquiry } from "../Model/Enquiry.js";
dotenv.config();
// ============================
// Create new enquiry
// ============================
export const createEnquiry = async (req, res)=>{

    try{
        const {name,email,phone, enquirie} = req.body;
        if(!name||name.trim() === "" 
        || !phone||phone.trim()===""
        || !email||email.trim()===""
        ||!enquirie || enquirie.trim()===""){
             return res.status(400).json({ error: "Please fill all fields" });
        }
    let enquiry = new Enquiry({
       name,email,phone, enquirie
    });

    await enquiry.save();

    if(!enquiry){
        return res.status(500).json({
        error: "Enquiry creation failed",
      });
    }
            // Email configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `${email}`,
      to: "kalimatagroup908@gmail.com",
      subject: `New  Enquiry Received from ${name}`,
      html: `
        <h3>Customer Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Enquiry:</strong> ${enquirie}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "Query created and email sent successfully",
      enquirie,
    });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    if (!enquiries || enquiries.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No enquiries found" 
      });
    }

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("getAllEnquiries error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};