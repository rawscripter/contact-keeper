const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');


// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   Post api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', auth,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number').isMobilePhone(),

    async (req, res) => {

        // check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, phone } = req.body;
            let user = req.user.id;
            const newContact = new Contact({
                user,
                name,
                email,
                phone
            });
            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });


// @route   Post api/contacts/:id
// @desc    Update Contact
// @access  Private
router.put('/:id', auth,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number').isMobilePhone(),

    async (req, res) => {
        // check errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // update contact
        try {
            const { name, email, phone } = req.body;
            let contact = await Contact.findById(req.params.id);
            if (!contact) return res.status(404).json({ msg: 'Contact not found' });
            if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
            // update contact
            contact = await Contact.findByIdAndUpdate(req.params.id, { name, email, phone }, { new: true });

            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });


// @route   Post api/contacts/:id
// @desc    Delete Contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {

        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        await contact.remove();
        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;