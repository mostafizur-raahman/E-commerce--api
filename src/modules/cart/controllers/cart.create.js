const Fault = require("../../middleware/Fault");
const { productModel } = require("../../product/product.model");
const { cartModel } = require("../cart.model");

const createCart = async (req, res, next) => {
    try {
        const { productId, sku, quantity } = req.body;

        // chekcing product exist or not
        const product = await productModel.findById(productId);
        if (!product) {
            throw new Fault("Product not found", 404);
        }

        console.log("PRODUCT ", product);

        // checking varitns exits or not
        const variant = product.variants.find((v) => v.sku === sku);
        if (!variant) {
            throw new Fault("Product variant not found", 404);
        }

        console.log("VARIANTS ", variant);

        let cart = await cartModel.findOne({ userId: req.user._id });
        if (!cart) {
            cart = new cartModel({ userId: req.user._id, lineItems: [] });
        }

        const existingItemIndex = cart.lineItems.findIndex(
            (item) =>
                item.productId.toString() === productId && item.sku === sku
        );
        console.log("existing item ", existingItemIndex);

        if (existingItemIndex > -1) {
            cart.lineItems[existingItemIndex].quantity += quantity;
        } else {
            cart.lineItems.push({
                productId,
                sku,
                quantity,
                price: variant.price,
            });
        }

        await cart.save();

        res.status(201).json({
            message: "Item added to cart successfully",
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createCart;
