const express = require('express');
const router = express.Router();
const { getBeds,addBed,editBed,deleteBed } = require('../controllers/bed-controller');

// Define routes
router.get('/', getBeds);
router.post('/', addBed);
router.put('/:id', editBed);
router.delete('/:id', deleteBed);

module.exports = router;
