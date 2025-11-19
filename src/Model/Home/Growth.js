// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const HomeGrowthSchema = new SCHEMA(
  {
   labels:{
        type: String,
      required: true,
     
   },
    Value:{
        type: String,
      required: true,
     
   },
    Milestone:{
        type: String,
      required: true,
     
   },
    Year:{
        type: String,
      required: true,
     
   },
   Title:{
        type: String,
        required: true,
   },
    Desc:{
        type: String,
      required: true,
     
   }, 
   Img:{
        type: String,
      required: true,
     
   },  
  },
  { timestamps: true }
);

export const HomeGrowth = mongoose.model("HomeGrowth", HomeGrowthSchema);
export default HomeGrowth;
