const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const JWT_SECRET = "Rakeshisgood$Boy";
const fetchuser = require("../middleware/fetchuser");

 
//ROUTE01 : Create a User using POST "/api/auth/createuser". No login required.
router.post("/register", [
    body("username", "Enter a valid username..!").isLength({ min: 3 }).trim().escape(),
    body("email", "Enter a valid email..!").isEmail().normalizeEmail(),
    body("password", "Please enter al least 3 charater").isLength({ min: 3 }),
  ],
  async (req, res) => {
    
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status:false, message:"Invalid field please try again." });
    }

    try {

      // Check whether the user with this email exists already.
      let userName = await User.findOne({ username: req.body.username });
      if (userName) {
        return res.status(400).json({ status: false, message: "Sorry a user with this username already exists..!" });
      }

      // Check whether the user with this email exists already.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ status: false, message: "Sorry a user with this email already exists..!" });
      }

      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
        profilePic: req.body.profilePic,
      });
      
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      return res.status(200).json({ status:true, message:"register successfully", token:authToken });
    } catch (error) {
      return res.status(400).json({status:false, message:"Internal server error"});
    }
  } 
);

//ROUTE02 : Autheticate a User using POST "/api/auth/login". No login required.
router.post("/login", [
    body("username", "Enter a valid username..!").isLength({ min: 3 }).trim().escape(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status:false, message:"Invalid field please try again." });
    }

    const { username, password } = req.body;
    try {
      // Check whether the user with this email exists already.
      let user = await User.findOne({ username });
      if (!user) {                
        return res.status(400).json({ status:false, message: "Please try to login with currect credential..!" });
      }

      const passwordcampare = await bcrypt.compare(password, user.password);
      if (!passwordcampare) {
        return res.status(400).json({ status:false, message: "Please try to login with currect credential..!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
     
      return res.status(200).json({ status:true, message:"Login successfully", token:authToken });
    } catch (error) {
      return res.status(400).json({status:false, message:"Internal server error"});
    }

  }
);

//ROUTE03 : Get Loggedin User Details using POST "/api/auth/getuser". login required.
router.post("/getuser", fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      return res.status(200).json({ status:true, message:user});
    } catch (error) {
      return res.status(500).json({ status:false, message:"Internal server error"});
    }
});



module.exports = router;



      
          
        