const { body, validationResult } = require('express-validator');

const productValidationRules = () => [
    body('name', 'Name is required')
        .notEmpty()
        .isString(),
    body('categoty', 'Type is required')
        .notEmpty()
        .isString(),
    body('price', 'Price is required')
        .notEmpty()
        .isNumeric({ min: 0, max: 10000 }),
    ]

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

module.exports = {
    productValidationRules,
    validate
}