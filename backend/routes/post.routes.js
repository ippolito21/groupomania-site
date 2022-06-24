const router = require("express").Router();
const passport = require("passport");
const postsController = require("../controllers/post.controller");
const multer = require("../middlewares/multer");

router.use(passport.authenticate("jwt", { session: false }));
// ** Tous les posts
router.get("/all", postsController.allPosts);
// ** creer un post
router.post("/create", multer, postsController.createPost);
router.put("/update/:id", multer, postsController.update);
router.delete("/delete/:id", postsController.delete);
router.get("/one/:id", postsController.onePost);
router.post("/:id/like", postsController.likes);

module.exports = router;
