// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const CSRSchema = new SCHEMA(
  {
  
      Img1:{
        type: String,
      required: true,
     
   },
      Htext1:{
        type: String,
      required: true,
     
   },
      Dtext1:{
        type: String,
      required: true,
     
   },   
    Img2:{
        type: String,
      required: true,
     
   },
      Htext2:{
        type: String,
      required: true,
     
   },
      Dtext2:{
        type: String,
      required: true,
     
   },
  },
  { timestamps: true }
);

export const CSR = mongoose.model("CSR", CSRSchema);
export default CSR;
