/*ces routes appelés controller sont associés à un controllers*/
const router = require("express").Router();
const multer = require("../middlewares/multer");
const userController = require("../controllers/user.controller");
// Inscription
router.post("/inscription",multer, userController.signup);

// Connexion
router.post("/connexion", userController.login);

// Profile
router.get('/profile/:id', userController.profile)

router.delete("/delete/:id", userController.delete)
module.exports = router;
