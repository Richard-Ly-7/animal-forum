const express = require('express');
const UserPost = require('../models/UserPost');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userPosts = await UserPost.find().sort({ _id : -1 });
        res.json(userPosts);
    }catch (error){
        res.status(500).json({ message : error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userPosts = await UserPost.findById(req.params.id);
        res.json(userPosts);
    }catch (error){
        res.status(400).json({ message : `No post with the id of ${req.params.username}` });
    }
});

router.get('/username/:username', async (req, res) => {
    try {
        const userPosts = await UserPost.find({ username: req.params.username });
        res.json(userPosts);
    }catch (error){
        res.status(400).json({ message : `No post posted by ${req.params.username}` });
    }
});

router.get('/posts/popular', async (req, res) => {
    try {
        const userPosts = await UserPost.find().sort({ likes : -1 });
        res.json(userPosts);
    }catch (error){
        res.status(500).json({ message : error.message });
    }
});

router.post('/', async (req, res) => {
    const userPost = new UserPost({
        username: req.body.username,
        description: req.body.description, //make sure this matches your schema
    });

    try {
        const newUserPost = await userPost.save();
        res.status(201).json(newUserPost);
    } catch (error){
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id/likes', async (req, res) => {
    try {
        const { username } = req.body;
        const userPost = await UserPost.findById(req.params.id);

        if(!userPost) {
            return res.status(404).json({ message: "Post doesn't exist." });
        }

        const likedByUser = userPost.likedby.find((name) => name === username );

        if(likedByUser !== undefined){
            userPost.likes -= 1;
            userPost.likedby = userPost.likedby.filter(name => name !== username);
        }else{
            userPost.likes += 1;
            userPost.likedby.push(username);
        }

        const updatedUserPost = await userPost.save();
        res.json(updatedUserPost);
        
    } catch (error){
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const username = req.body.username;

    try {
        const userPost = await UserPost.findById(req.params.id);
        
        if(!userPost){
            return res.status(404).json({ message: "Post doesn't exist." });
        }

        if(userPost.username !== username){
            return res.status(501).json({ message: "This post does not belong to this user." });
        }

        await UserPost.findByIdAndDelete(req.params.id);
        res.json({ message: 'User Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;