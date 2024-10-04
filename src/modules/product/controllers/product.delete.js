const { default: mongoose } = require("mongoose");
const { productModel } = require("../product.model");
const Fault = require("../../middleware/Fault");

const deleteProdut = async (req, res, next) => {
    try {
        const id = req.query.id;

        const exist = await productModel.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false,
        });

        if (!exist) {
            throw new Fault("product not found", 404);
        }

        const product = await productModel.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(id),
            },
            {
                $set: {
                    isDeleted: true,
                },
            }
        );

        return res.status(200).json({
            message: "product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteProdut;
