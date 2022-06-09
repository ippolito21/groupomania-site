const router = require("express").Router();
const postsController = require("../controllers/post.controller");
const multer = require("../middlewares/multer")
// ** Tous les posts
router.get("/all", postsController.allPosts);
// ** creer un post
router.post("/create", multer, postsController.createPost);
module.exports = router;
