const router = require("express").Router();

const { login, deletePost, updatePost } = require("../controllers/admin.controller");

router.post("/login", login);
router.delete("/post/delete/:id", deletePost)
router.put("/posts/update/:id", updatePost )
module.exports = router;

/// /api/admin/posts/update/:id