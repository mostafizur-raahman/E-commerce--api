const Fault = require("../../middleware/Fault");
const { userModel } = require("../user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../../../config");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email: email,
        });

        if (!user) {
            throw new Fault("You are not a register, please sign up", 400);
        }

        const checkValidPass = await bcrypt.compare(password, user.password);

        if (!checkValidPass) {
            throw new Fault("Invalid credentials", 400);
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            config.jwt_secret,
            {
                expiresIn: config.jwt_ttl,
            }
        );

        return res.status(201).json({
            message: "login succesfully",
            token: token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = login;
