// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const ProductSchema = new SCHEMA(
  {
   Name:{
        type: String,
      required: true,
     
   },
     Dtext:{
        type: String,
      required: true,
     
   },
      Img1:{
        type: String,
      required: true,
     
   },
    Img2:{
        type: String,
      required: true,
     
   },
    Img3:{
        type: String,
      required: true,
     
   },
    CatagoryId:{
       type: mongoose.Schema.Types.ObjectId,
        ref: "Catagory",
     
   },
    SubcatagoryId:{
       type: mongoose.Schema.Types.ObjectId,
        ref: "Subcatagory",
     
   },   
   Cline1:{
        type: String,
      required: true,
     
   },
   Cline2:{
        type: String,
      required: true,
     
   },
   Cline3:{
        type: String,
      required: true,
     
   },
    Cline4:{
        type: String,
      required: true,
     
   },
    Cline5:{
        type: String,
      required: true,
     
   },
    Cline6:{
        type: String,
      required: true,
     
   },

   Tspec1:{
        type: String,
      required: true,
     
   },
   Tspec2:{
        type: String,
      required: true,
     
   },
   Tspec3:{
        type: String,
      required: true,
     
   },
   Tspec4:{
        type: String,
      required: true,
     
   },
   Tspec5:{
        type: String,
      required: true,
     
   },
   Tspec6:{
        type: String,
      required: true,
     
   },
    Tspec7:{
        type: String,
      required: true,
     
   },
   Tspec8:{
        type: String,
      required: true,
     
   },
   Tspec9:{
        type: String,
      required: true,
     
   },
   Tspec10:{
        type: String,
      required: true,
     
   },
   App1:{
     type: String,
      required: true,
   },
   App2:{
     type: String,
      required: true,
   },
   App3:{
     type: String,
      required: true,
   },
   App4:{
     type: String,
      required: true,
   },
    App5:{
     type: String,
      required: true,
   },
  App6:{
     type: String,
      required: true,
   },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
export default Product;
