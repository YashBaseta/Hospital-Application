const express = require('express');
const router = express.Router();
const { getSupplies,addSupplies,editSupplies,deleteSupplies} = require('../controllers/supplies-controller');

// Define routes
router.get('/', getSupplies);
router.post('/', addSupplies);
router.put('/:id', editSupplies);
router.delete('/:id', deleteSupplies);

module.exports = router;
