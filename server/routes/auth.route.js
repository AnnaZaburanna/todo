const {check} = require("express-validator");

module.exports = app => {
    const auth = require("../controlers/auth.controller");
    const router = require("express").Router();

    router.post(
        "/login",
        [
            check('email', "Enter correct email").normalizeEmail().isEmail(),
            check("password", "Enter password").exists()
        ],
        auth.logIn);

    router.post(
        "/signup",
        [
            check('email', 'Incorrect email').isEmail(),
            check('password', 'At least 6 characters are required').isLength({ min:6 })
        ],
        auth.signUp);

    app.use("/api/auth", router);
}