const express = require('express');
const router = express.Router();
const { getTopProducts } = require('../controllers/productsController');

router.get('/:category', getTopProducts);

module.exports = router;
