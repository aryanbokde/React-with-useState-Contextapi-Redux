const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require('../models/User');
const Post = require('../models/Post');
const { findById } = require('../models/Post');
const fetchuser = require("../middleware/fetchuser");
const { json } = require('stream/consumers');

//Router 06 : Get All Post for fronend show
router.get('/all/', async (req, res, ) => {
    
    const limit = req.query.limit ? parseInt(req.query.limit) : 4 ;
    const page = req.query.page ? parseInt(req.query.page) : 1 ;

    try {
        const posts = await Post.find()
            .limit(limit).skip((page-1) * limit );
        res.status(200).send(posts);
    } catch (e) {
        console.log(e);
    }
    // try {
    //     let posts = await Post.find().sort({ createdAt: "desc" });
    //     return res.status(200).json({status:true, message:posts});
    // } catch (error) {
    //     return res.status(500).json({status:false, message:"Internal server error..!"});
    // }
   
});
//ROUTE 01 : Get all the Notes Using GET "/api/notes/fetchallnotes". login required.
router.get('/getpostsbyuser', fetchuser, async(req, res) => {
       
    try {
        const posts = await Post.find({ userId: req.user.id }).sort({ createdAt: "desc" });
        return res.status(200).json({status:true, message:posts});
    } catch (error) {
        return res.status(500).json({status:false, message:"Internal server error"});
    }
  
});

//Router 02 : Create Post by autheticate user.
router.post('/',[
    body("title", "Enter a title..!").isLength({ min: 3 }),
    body("desc", "Enter description..!").isLength({ min: 5 }),
    ], fetchuser, async (req, res) => {
        // res.status(200).json("post added");
    try {

        const { title, desc, photo, categories} = req.body;    

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status:false, message:"All field is required." });
        }       

        let matchTitle = await Post.findOne({ title });
        if (matchTitle) {
            return res.status(409).json({ status:false, message:"Title should be unique." });
        }

        const post = new Post({
            userId:req.user.id, title, desc, photo, categories
        });       

        const savedPost = await post.save();
        return res.status(200).json({ status:true, message:"New post has been created.", data:savedPost});

    } catch (error) {
        return res.status(500).json({ status:false, message:"Internal server error." });
    }
    
        

});

//Router 03 : Update Post Using Put Method by autheticate user.
router.put('/:id',[
    body("title", "Enter a title..!").isLength({ min: 3 }),
    body("desc", "Enter description..!").isLength({ min: 5 }),
    ], fetchuser, async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status:false, message:"All field is required." });
        }       

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ status:false, message:"Post not found..!" });                        
        }
        // let matchTitle = await Post.findOne({ title:req.body.title });
        // if (matchTitle) {
        //     return res.status(409).json({ status:false, message:"Title should be unique." });
        // }
        const postuserId = post.userId.toString();

        if (postuserId === req.user.id) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, { $set : req.body }, { new: true}
                );                
                return res.status(200).json({status:true, message:"Post has been updated..!"});
            } catch (error) {
                return res.status(500).json({status:false, message:"Something goes wrong..!"});
            }
        }else{
            return res.status(401).json({status:false, message:"You can update only your post..!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:false, message:"Internal server error"});
    }
   
});

//Router 04 : Delete Post Using Delete Method by autheticate user.
router.delete('/:id', fetchuser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const postDeleteId = post.userId.toString();
        if (postDeleteId === req.user.id) {
            try {
                const deletedPost = await post.delete();
                return res.status(200).json({status:true, message:"Post has been deleted..!", data:deletedPost});
            } catch (error) {
                return res.status(500).json({status:false, message:"Internal server error..!"});
            }
        }else{
            return res.status(401).json({status:false, message:"You can delete only your post..!"});
        }
    } catch (error) {
        return res.status(500).json({status:false, message:"Internal server error..!"});
    }
   
});

//Router 05 : Get post for single post page 
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json({status:true, message:post});
    } catch (error) {
        return res.status(500).json({status:false, message:"Internal server error..!"});
    }
   
});

//Router 06 : Get All Post for fronend show
router.get('/', async (req, res, ) => {
    let post ;
    try {
        let posts = await Post.find().sort({ createdAt: "desc" });
        return res.status(200).json({status:true, message:posts});
    } catch (error) {
        return res.status(500).json({status:false, message:"Internal server error..!"});
    }
   
});




module.exports = router;

