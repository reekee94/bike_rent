const express = require('express')
const { productValidationRules, validate } = require('../middleware/validation');
const BikeController = require('../controllers/bikes-controllers')


const router = express.Router()


router.route('/')
    .get( BikeController.getAllRentedBikesSum )

router.route('/:id')
    .get( BikeController.rentPrice)





module.exports = router