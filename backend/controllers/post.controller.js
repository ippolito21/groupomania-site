const PostModel = require("../models/post.model");
exports.allPosts = async (req, res) => {
  const posts = await PostModel.find().populate("userId", "username imageUrl")
  .sort({'date' : -1});
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const body = req.body;
  // on recupere les données relatives à la sauce comme le names , description etc...
  try {
    // on crée un nouveau document sauce avec les  données de la sauce ainsi que l'imageUrl
    await new PostModel({
      ...body,
      imageUrl: `${req.protocol}://${req.get("host")}/public/images/${
        req.file.filename
      }`,
    }).save();

    // ** On retourne un message de creation avec un status code de 201
    res.status(201).json({ message: "post crée!" });
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};
