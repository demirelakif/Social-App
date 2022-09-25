const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  let { title, description } = req.body;

  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    //create post

    let createdPost = await new Post({
      title,
      description,
      owner: req.user.username,
      imagePath: result.secure_url,
    })
    await createdPost.save();
    res.status(201).json({
      message: "Post created successfully",
    });
  } catch (err) {

    res.status(500).json({
      error: err,
    });
  }
}

exports.deletePost = async (req, res) => {
  let { _id, username } = req.body;
  Post.findByIdAndDelete(_id , async function (err, docs) {
    if (err) {
      res.status(400).json({
        error:err
      })
    }
    else {
      if (username == docs.owner) {
        var link = docs.imagePath
        filename = link.split("/").pop().split(".")[0]
        const result = await cloudinary.uploader.destroy(filename);
        res.status(201).json({
          message: result
        })
      }else{
        res.status(400).json({
          error:"Wrong owner"
        })
      }

    }
  });

}


exports.getAllPost = async (req, res) => {
  Post.find({}, function(err, posts) {
    res.send(posts);  
  });
}

exports.getPostsFromUser = async (req, res) => {
  Post.find({owner:req.body.username}, function(err, posts) {
    res.send(posts);  
  });
}




