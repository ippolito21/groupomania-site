/*ces routes appelés controller sont associés à un controllers*/
const router = require("express").Router();
const userController = require("../controllers/user.controller");
// Inscription
router.post("/inscription", userController.signup);

// Connexion
router.post("/connexion", userController.login);

module.exports = router;
