const { default: mongoose } = require("mongoose");
const Fault = require("../../middleware/Fault");
const { cartModel } = require("../cart.model");

const readCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const pipeline = await cartModel.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) },
            },
            {
                $unwind: "$lineItems",
            },
            {
                $lookup: {
                    from: "products",
                    localField: "lineItems.productId",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails",
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    "lineItems.productId": "$lineItems.productId",
                    "lineItems.sku": "$lineItems.sku",
                    "lineItems.quantity": "$lineItems.quantity",
                    "lineItems.price": "$lineItems.price",
                    "lineItems.name": "$productDetails.name", // Add product name
                    "lineItems.image": {
                        $arrayElemAt: ["$productDetails.images", 0],
                    }, // Add first image
                },
            },
            {
                $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },
                    lineItems: { $push: "$lineItems" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                },
            },
        ]);

        if (!pipeline || pipeline.length === 0) {
            throw new Fault("Cart not found", 404);
        }

        return res.status(200).json({
            message: "Cart retrieved successfully",
            data: pipeline[0],
        });
    } catch (error) {
        next(error);
    }
};

module.exports = readCart;
