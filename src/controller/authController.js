const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../config/auth');

const router = express.Router();

function generateToken(id) {
    return jwt.sign({ id: id }, authConfig.secret, {
        expiresIn: 86400,
    });

}

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try{
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }

        const user = await User.create(req.body);
        const token = generateToken(user._id);

        return res.send({ user, token });
    } catch (err) {
        return res.status(400).send({ error: err });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    const token = generateToken(user._id);

    res.send({ user, token });
});

router.get('/search', async (req,res) => {
    const user = await User.find();

    res.send({user});
});

module.exports = app => app.use('/auth', router);