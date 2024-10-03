const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: String,
        descripiton: String,
        images: [String],
        variants: [
            {
                sku: String,
                price: Number,
                size: {
                    type: String,
                    enum: ["M", "X", "L", "XL", "XXL", "SM"],
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

exports.productModel = model("Product", productSchema);
