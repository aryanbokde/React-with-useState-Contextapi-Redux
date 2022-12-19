const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require('../models/User');


//Router 02 : Register a new user using Post API.
router.post('/register', async (req, res) => {
    try {
  
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
            profilePic: req.body.profilePic,
        });

        const user = await newUser.save();
        res.status(200).json( user );
        
    } catch (error) {
        res.status(500).send(error);
    }

});

//Router 01 : Login a user using Post API.
router.post('/login', async (req, res) => {
    try {
       
        const user = await User.findOne({username: req.body.username});
        // res.status(200).json(user);
        if (!user) {
            return res.status(400).json({ error: "Please try to login with currect credential..!" });
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).json({ error: "Please try to login with currect credential..!" });
        }

        const { password, ...others } = user._doc;
        res.status(200).json({user: others});
        
        
    } catch (error) {
        res.status(500).send(error);
    }

});


module.exports = router;



      
          
        