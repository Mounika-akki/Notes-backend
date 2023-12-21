const router = require("express").Router();
const userCtrl = require("../controllers/userControl");
const auth = require("../middleware/auth");

// register user
router.post("/register", userCtrl.registerUser);

// login user
router.post("/login", userCtrl.loginUser);

module.exports = router;
