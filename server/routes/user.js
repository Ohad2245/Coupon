const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")
const auth = require("../middleware/auth")


router.post("/getInfo", userController.getSingleUser);
router.put("/:userId", auth, userController.updateUser);
router.post("/register", userController.createUser);
router.post("/auth", userController.loginUser);
router.post('/logout', userController.logout)


module.exports = router
