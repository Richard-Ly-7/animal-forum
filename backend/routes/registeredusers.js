const bcrypt = require('bcrypt');
const express = require('express');
const RegisteredUser = require('../models/RegisteredUser');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const registeredUsers = await RegisteredUser.find();
        res.json(registeredUsers);
    }catch (error){
        res.status(500).json({ message : error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const registeredUsers = await RegisteredUser.findById(req.params.id);
        res.json(registeredUsers);
    }catch (error){
        res.status(400).json({ message : `No user with the id of ${req.params.username}` });
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    //encrypt password
    const hash = await bcrypt.hash(password, 13);

    const userExists = await RegisteredUser.findOne({ username: username });

    if(userExists){
        res.status(404).json({ message: "Username is taken." });
    }else{
        const registeredUser = new RegisteredUser({
            username: username,
            password: hash,
        });

        try {
            const newRegisteredUser = await registeredUser.save();
            res.status(201).json(newRegisteredUser);
        } catch (error){
            res.status(400).json({ message: error.message });
        }
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const registeredUser = await RegisteredUser.findOne({ username: username });

    if(!registeredUser){
        return res.status(404).json({ message: "User not found." });
    }

    const validLogin = await bcrypt.compare(password, registeredUser.password);

    if(!validLogin){
        return res.status(401).json({ message: "Password is incorrect." });
    }

    return res.status(200).json({ message: "User is now logged in.", username: username });
});

module.exports = router;