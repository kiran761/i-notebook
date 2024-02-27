const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')

const JWT_SECRET = "Kiran Kumar Reddy";
//Create a user using post '/api/auth/" . Doesnt require auth"
router.post('/createuser', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('name', 'Enter a valid email').isLength({ min: 3 }),
    body('password', 'password atleast should be 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    try {
        if (user) {
            return res.status(400).json({ error: " This Email is already used" })
        }
        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })
        const data ={
            user :{
                id :user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        res.json(authToken)
    } catch (error) {
        Console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// authenticate user login

router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password',"Password cannot be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email , password}=req.body;
    try{
        let user =await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({error: "please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({error :"please try to login with correct credentials"})
        }
        const data ={
            user :{
                id :user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        res.json(authToken)
    }
    catch(error){
        Console.log(error.message);
        res.status(500).send("Internal Server Error")
    }

})
module.exports = router