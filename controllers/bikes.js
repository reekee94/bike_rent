require('dotenv').config()
const modelBikes = require('../models/Bike')
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')

//Щоб не писати try/catch

const getBikes = asyncHandler(async (req, res) => {
    const product = await modelBikes.find()
    if (!product) {
        return next(
            new ErrorResponse('Product not found.', 404)
        )
    }
    res.status(200).send(product)
})

const getBike = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await modelBikes.findById(id)
    if (!product) {
        return next(
            new ErrorResponse('Product not found.', 404)
        )
    }
    res.status(200).send(product)
})

const createBike = asyncHandler(async (req, res) => {
    const { name, category, price } = req.body
    const product = new modelBikes({
        name,
        category,
        price,
        available: true
    })
    const newProduct = await product.save()
    res.status(200).send(newProduct)
})

const updateBike = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product  = req.body
    const updatedProduct = await modelBikes.findByIdAndUpdate(id, product,{
        returnOriginal: false
    })
    if (!updatedProduct) {
        return next(
            new ErrorResponse('Product not found.', 404)
        )
    }
    res.status(200).send(updatedProduct)
})

const deleteBike = asyncHandler(
    async (req, res) => {
        console.log(req)
        const { id } = req.params;
        const deletedProduct = await modelBikes.findByIdAndDelete({ _id: id });
        if (!deletedProduct) {
            return next(
                new ErrorResponse('Product not found.', 404)
            )
        }
        res.status(200).send(`Product ${deletedProduct.title} successfully deleted!`);
    })

module.exports = {
    getBike,
    getBikes,
    deleteBike,
    updateBike,
    createBike
}