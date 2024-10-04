const Fault = require("../../middleware/Fault");
const { productModel } = require("../product.model");

const createProduct = async (req, res, next) => {
    try {
        const product = req.body;

        const slugExist = await productModel.findOne({
            slug: product.slug,
        });

        if (slugExist) {
            throw new Fault("Slug already exist", 400);
        }

        return res.status(201).json({
            message: "Product create succesfully",
            data: await productModel.create(product),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createProduct;
