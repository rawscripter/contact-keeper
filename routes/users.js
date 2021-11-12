const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');


// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',
    // validate the request
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Email is Required').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        // check for errors in the request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // destructure the request body
            const { name, email, password } = req.body;
            // get all users

            // check user exists in the database
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // create a new user
            let newUser = new User({
                name,
                email,
                password
            });

            // hash the password
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);

            await newUser.save();

            const payload = {
                user: {
                    id: newUser.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;