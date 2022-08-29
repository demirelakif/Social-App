const express = require("express")
const router = express.Router()
const auth = require("../middleware/Auth");
const upload = require("../utils/multer");
const Post = require("../models/Post");
const { createPost, deletePost, getAllPost } = require("../controllers/Post");


router.post("/createPost",auth,upload.single("image"),createPost)

router.post("/deletePost",auth,deletePost)

router.get("/getAllPost",getAllPost)


module.exports = router