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
    const validStartDate = {rentStarted: Date.now(), ...product}
    const updatedProduct = await modelBikes.findByIdAndUpdate(id, validStartDate,{
        returnOriginal: false
    })
    if (!updatedProduct) {
        return next(
            new ErrorResponse('Product not found.', 404)
        )
    }
    setTimeout(() => {
        res.status(200).send(updatedProduct)
    },
    2000
    )
})

const deleteBike = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const deletedProduct = await modelBikes.findByIdAndDelete({ _id: id });
        if (!deletedProduct) {
            return next(
                new ErrorResponse('Product not found.', 404)
            )
        }
        res.status(200).send(`Product ${deletedProduct.title} successfully deleted!`);
    })

const rentBike = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product  = {
        available: false,
        rentStarted: Date.now()
    }
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

const rentPrice = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await modelBikes.findById(id)
    if (!product) {
        return next(
            new ErrorResponse('Product not found.', 404)
        )
    }
    const dateEnd = Date.now()
    const hoursRented = Math.ceil((dateEnd - product.rentStarted) / 3600000 % 24)
    const bill = hoursRented * product.price
    res.status(200).send(`${bill}`)
})

const getAllRentedBikesSum = asyncHandler(async (req, res) => {
    const allBikes = await modelBikes.find()
    const rentedBikes = allBikes.filter(item => !item.available)
    const dateEnd = Date.now()
    const currentSumForRent = rentedBikes
        .map(item => item.price * Math.ceil((dateEnd - item.rentStarted) / 3600000 % 24))
        .reduce((prev, curr) => prev + curr, 0);
    if (!currentSumForRent) {
        return next(
            new ErrorResponse('Product not found.', 404)
        )
    }
    res.status(200).send(`${currentSumForRent}`)
})

module.exports = {
    getBike,
    getBikes,
    deleteBike,
    updateBike,
    createBike,
    rentBike,
    rentPrice,
    getAllRentedBikesSum
}