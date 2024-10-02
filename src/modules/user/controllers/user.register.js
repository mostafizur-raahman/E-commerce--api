const Fault = require("../../middleware/Fault");
const { userModel } = require("../user.model");

const userRegister = async (req, res, next) => {
    try {
        const user = req.body;

        const isExist = await userModel.findOne({
            email: user.email,
        });
        if (isExist) {
            throw new Fault("Email already in use, please sign in.", 400);
        }
        const newUser = await userModel.create(user);

        return res.status(201).json({
            message: "User create succesfully",
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = userRegister;
