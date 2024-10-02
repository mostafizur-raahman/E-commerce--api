const mongoose = require("mongoose");
const config = require("./index");

exports.dbConnect = async () => {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log("Mongodb connected...");
    } catch (error) {
        console.log("Error ", error);
        throw error;
    }
};
