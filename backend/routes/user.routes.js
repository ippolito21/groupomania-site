/*ces routes appelés controller sont associés à un controllers*/
const router = require("express").Router();
const multer = require("../middlewares/multer");
const userController = require("../controllers/user.controller");
// Inscription
router.post("/inscription",multer, userController.signup);

// Connexion
router.post("/connexion", userController.login);

module.exports = router;
