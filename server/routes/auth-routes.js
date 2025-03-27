const express = require("express");
const { getLogin,register, login, getProfile } = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get('/user', getLogin);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
