const mongoose = require("mongoose");

const conn = async()=>{
   try {
     await mongoose.connect("mongodb+srv://bharatsharma98971:bharat123@cluster0.7enbqfw.mongodb.net/");
     console.log("Connected MongoDB");
   } catch (error) {
    console.log(error);
   }
}

module.exports = conn; 