const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const conn = require("./conn/conn");
const User = require("./models/userSchema"); 
conn();
app.use(express.json())
app.use(cors());
const port = 4000 || process.env.PORT;

// routes
app.use("/api/v1", require("./routes/userRoutes"));
app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/users", require("./routes/settingsRoutes"));

// public link

app.get("/user/public/:userLink", async (req, res) => {
    console.log("called");
    try {
      const { userLink } = req.params;
  
      const user = await User.findOne({ userLink }).select('name profilePic socialLinks products');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'Public profile fetched successfully',
        user,
      });
    } catch (err) {
      console.error("Error fetching public profile:", err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

app.listen(port, ()=>{
    console.log(`Server is live at ${port}`);
})