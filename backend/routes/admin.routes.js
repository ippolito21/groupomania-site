const router = require("express").Router();
const multer = require('../middlewares/multer')
const passport = require('passport')

const { login, deletePost, updatePost } = require("../controllers/admin.controller");

router.post("/login", login);
router.use(passport.authenticate("jwt", {session : false}))
router.delete("/post/delete/:id", deletePost)
router.put("/posts/update/:id", multer, updatePost )
module.exports = router;

/// /api/admin/posts/update/:id