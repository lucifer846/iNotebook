const router = require('express').Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middlewares/fetchUser');

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required

router.post('/createuser',[
    body('name', 'name must be atleast 3 characters').isLength({ min: 3 }),
    body('email', 'invalid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });}

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        try { const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "email already exists" });}

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass});

        const jwtToken = jwt.sign({ user: user._id }, "randomString");

        res.status(201).json({authtoken: jwtToken,  message: "user created" });

    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required

router.post('/login',[
    body('email', 'invalid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });}

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ error: "invalid credentials" });}

            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if (!passwordCompare) { 
                return res.status(400).json({ error: "invalid credentials" });}

            const jwtToken = jwt.sign({ user: user._id }, "randomString");

            res.status(200).json({authtoken: jwtToken,  message: "user logged in" });

        } catch (error) {
            res.status(500).json({ error: "server error" });
        }
});


// Route 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user;
        const user = await User.findById(userId).select("-password");
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
});

module.exports = router;

