const Fault = require("../../middleware/Fault");
const { productModel } = require("../product.model");

const read = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalProducts = await productModel.countDocuments({
            isDeleted: false,
        });

        const products = await productModel
            .find({ isDeleted: !true })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: "Products retrieved successfully",
            data: products,
            pagination: {
                total: totalProducts,
                page,
                pages: Math.ceil(totalProducts / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = read;
