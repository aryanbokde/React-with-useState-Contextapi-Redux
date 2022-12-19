const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require('../models/User');
const Post = require('../models/Post');
const { findById } = require('../models/Post');

//Router 01 : Create a New Post Using Post Method.
router.post('/', async (req, res) => {

    const newPosts = new Post(req.body);
    try {
        const savedPost = await newPosts.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }

});

//Router 02 : Update Post Using Put Method.
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, { $set : req.body }, { new: true}
                );
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(401).json("You can update only your post..!");
        }
    } catch (error) {
        res.status(401).json(error);
    }
   
});

//Router 03 : Delete Post Using Delete Method.
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const deletedPost = await post.delete();
                res.status(200).json(deletedPost);
            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(401).json("You can delete only your post..!");
        }
    } catch (error) {
        res.status(401).json(error);
    }
   
});

//Router 04 : Get Post Using Post ID Using Get Method.
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
   
});

//Router 04 : Get All Post Using Get Method.
router.get('/', async (req, res, ) => {
    const urlusername = req.query.user;
    const catName = req.query.cat;
    const username = req.query.username;

    try {
        let posts ;
        
        if (username ) {
            posts = await Post.find({ username }).sort({ createdAt: "desc" });
        }else if(urlusername) {
           posts = await Post.find({ username }).sort({ createdAt: "desc" });
        }else if(catName) {
            posts = await Post.find({ categories : {
                $in : [catName],
            },
        }).sort({ createdAt: "desc" });
        }else{
            // posts = await Post.find().limit(resultsPerPage).skip(resultsPerPage * page);
            posts = await Post.find().sort({ createdAt: "desc" });
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
   
});

module.exports = router;

