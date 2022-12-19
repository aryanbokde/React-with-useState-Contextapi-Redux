const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const User = require('../models/User');
const Post = require('../models/Post');
const { json } = require('express');

//Router 01 : Update a user using User API.
router.put('/:id', fetchuser, async(req, res) => {

    if (req.params.id === req.user.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, { $set : req.body }, { new: true}
            );
            return res.status(200).json({status:true, message:"User update successfully..!"});
        } catch (error) {
            return res.status(500).json({status:false, message:"Internal server error..!"});
        }
    }else{
        return res.status(401).json({status:false, message:"You can update only your account"});
    }

});

//Router 02 : Delete a user using User API.
router.delete('/:id', fetchuser, async (req, res) => {

    if (req.user.id === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ userId : req.user.id});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted");
            } catch (error) {
                res.status(200).json(error);
            }     
        } catch (error) {
            res.status(401).json("User Not Found!.");
        }   
    }else{
        res.status(401).json("You can update only your account");
    }
});

//Router 03 : Get a user using User API.
router.get('/:id', fetchuser, async (req, res) => {  

    if (req.params.id === req.user.id) {
        try {
            const user = await User.findById(req.params.id);
            // console.log(user);
            const { password, ...others } = user._doc;
            return res.status(200).json({status:true, message:others});
    
        } catch (error) {
            return res.status(400).json({status:false, message:"User not found..!"});
        }       
    }else{
        return res.status(401).json({status:false, message:"You can Edit only your account"});
    }
    
});




module.exports = router;

