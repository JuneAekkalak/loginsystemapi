const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../models/login.js');

const saltRounds = 10;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
SEKRETKEY = 'cD#9F3h&W2vYqZ@*8aB5tLrU$pS!nJ' // Hard Code

router.post('/userlogin', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log(username)
        if (!emailRegex.test(username)) {
            return res.status(400).json({ message: "รูปแบบของชื่อผู้ใช้ไม่ถูกต้อง (ต้องเป็นอีเมล)" });
        }

        const user = await login.findOne({ Username: username });

        if (!user) {
            return res.status(404).json({ message: "ไม่พบชื่อผู้ใช้" });
        }

        const passwordMatch = await bcrypt.compare(password, user.Password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }

        const token = jwt.sign({ username: user.Username }, SEKRETKEY); 

        res.status(200).json({ token });

    } catch (err) {
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        console.log(username)
        if (!emailRegex.test(username)) {
            return res.status(400).json({ message: "รูปแบบของชื่อผู้ใช้ไม่ถูกต้อง (ต้องเป็นอีเมล)" });
        }

        const existingUser = await login.findOne({ Username: username });
        if (existingUser) {
            return res.status(400).json({ message: "ชื่อผู้ใช้ซ้ำกัน" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await login.create({ Username: username, Password: hashedPassword });

        res.status(201).json({ message: "ลงทะเบียนสำเร็จ" });

    } catch (err) {
        next(err);
    }
});


module.exports = router;
