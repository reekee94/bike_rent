const express = require('express')
const { productValidationRules, validate } = require('../middleware/validation')
const BikeController = require('../controllers/bikes-controllers')


const router = express.Router()

// Chain of responsibilyty
router.route('/')
    .get( BikeController.getBikes )
    .post( BikeController.createBike )


router.route('/:id')
    .get( BikeController.getBike)
    // тут було просто апдейт байк
    .put( BikeController.updateBike )
    .delete( BikeController.deleteBike )


module.exports = router