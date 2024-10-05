const { Schema, model, default: mongoose } = require("mongoose");

const cartSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        lineItems: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                sku: {
                    type: String, // The SKU represents the variant (since variants are embedded)
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1, // Each cart item should have at least one quantity
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

exports.cartModel = model("Cart", cartSchema);
