const {validationResult} = require("express-validator");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/default.json')

const jwt = require("jsonwebtoken");
const jwtSecret = config.jwtSecret

//api/auth/login
exports.logIn = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect login data"
            })
        }

        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message: 'This user does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message:"Wrong password, try again"})
        }

        const token = jwt.sign({userId: user._id}, jwtSecret, {expiresIn: "1h"})
        res.json({ token, })

    } catch (e) {
        res.status(500).json({message: "Something went wrong, try again", error: e})
    }
}

//api/auth/signup
exports.signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect registration data"
            })
        }
        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if(candidate) {
            return res.status(400).json({ message: "This user exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User was created' });

    }catch(e) {
        res.status(500).json({ message: "Something went wrong, try again", error: e })
    }
}