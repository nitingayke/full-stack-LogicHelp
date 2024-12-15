const User = require("../Models/UserModel.js");
const { createSecretToken } = require("../UtilErrors/SecretToken.js");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {

    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, password: hashedPassword, username });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        httpOnly: false,
        // secure: true,
        // sameSite: 'None',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User signed in successfully", success: true, user });

    next();
}

module.exports.Login = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: 'Incorrect password or email' })
    }
    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
        return res.json({ message: 'Incorrect password or email' })
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        httpOnly: false,
        // secure: true,
        // sameSite: 'None',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User logged in successfully", success: true });

    next();
}