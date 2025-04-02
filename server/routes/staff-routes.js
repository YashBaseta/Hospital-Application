const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const { getStaffs,addStaff,editStaff,deleteStaff } = require('../controllers/staff-controller');

// Define routes
router.get('/', getStaffs);
router.post("/",[
      body("email").isEmail().withMessage("Invalid email"),
      body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    addStaff
  );


router.put('/:id', editStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
