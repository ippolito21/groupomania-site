const fs = require("fs/promises");
const PostModel = require("../models/post.model");
exports.allPosts = async (req, res) => {
  const posts = await PostModel.find()
    .populate("userId", "username imageUrl")
    .sort({ date: -1 });
  res.status(200).json(posts);
};

exports.onePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  res.status(200).json(post);
};

exports.createPost = async (req, res) => {
  const body = req.body;
  // on recupere les données relatives au post comme le names , description etc...
  try {
    // on crée un nouveau document post avec les  données de la post ainsi que l'imageUrl
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
exports.update = async (req, res) => {
  const { userId } = req.body;
  const { file } = req;

  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post inexistant" });
    if (userId !== post.userId.toString())
      return res.status(403).json({ message: "Action Interdite" });
    const updatePost = {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/public/images/${
        file.filename
      }`,
    };

    const image = post.imageUrl.split("images/")[1];
    await fs.unlink(`public/images/${image}`);
    await PostModel.updateOne(
      { _id: req.params.id },
      { ...updatePost, _id: req.params.id }
    );
    res.status(201).json({ message: "Post mis à jour" });
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};
exports.delete = async (req, res) => {
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post inexistant" });
    if (userId !== post.userId.toString())
      return res.status(403).json({ message: "Action Interdite" });

    const image = post.imageUrl.split("images/")[1];
    await fs.unlink(`public/images/${image}`);
    await PostModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ messahe: "Post Supprimé" });
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};

exports.likes = async (req, res) => {
  // ** On recupere l'identifiant des likes depuis les parametre de l'url
  const id = req.params.id;
  // **On extrait le like ainsi que le userId depuis le corps de la requete
  const { like, userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post non trouvé" });
    if (like === 1) {
      if (!post.usersLiked.includes(userId)) {
        await PostModel.updateOne(
          { _id: id },
          { $push: { usersLiked: userId }, $inc: { likes: 1 } }
        );
        res.status(201).json({ message: "like pris en compte" });
      }
    }
    if (like === 0) {
      if (post.usersLiked.includes(userId)) {
        await PostModel.updateOne(
          { _id: id },
          { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
        );
        res.status(201).json({ message: "annulation de like prise en compte" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
