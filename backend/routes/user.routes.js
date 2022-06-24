/*ces routes appelés controller sont associés à un controllers*/
const router = require("express").Router();
const multer = require("../middlewares/multer");
const passport = require('passport')
const userController = require("../controllers/user.controller");
// Inscription
router.post("/inscription",multer, userController.signup);

// Connexion
router.post("/connexion", userController.login);


router.use(passport.authenticate("jwt", {session : false}))
// Profile
router.get('/profile/:id', userController.profile)

router.delete("/delete/:id", userController.delete)
module.exports = router;
