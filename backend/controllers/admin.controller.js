const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const AdminModel = require("../models/admin.model");
const PostModel = require("../models/post.model");

const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
exports.login = async (req, res) => {
  const { username, email, password } = req.body;
  const admins = await AdminModel.find();
  if (admins.length === 0) {
    await new AdminModel({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: await bcrypt.hash(ADMIN_PASSWORD, 10),
    }).save();
  }
  const admin = await AdminModel.findOne({ email: email });
  if (!admin) return res.status(404).json({ message: "Admin non existant" });
  const isPasswordMatching = await bcrypt.compare(password, admin.password);
  // Si ça renvoie false on retoure une erreur 401 avec le message Connexion
  if (!isPasswordMatching)
    return res.status(401).json({ message: "Connexion non autorisée" });
  res.status(200).json({
    userId: admin._id,
    token: jwt.sign({ userId: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "5h",
    }),
    //authentification le serveur vérifie que le token de l'utilisateur est valide signé,avec le code secret
  });
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const admin = await AdminModel.findById(userId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    const image = post.imageUrl.split("images/")[1];
    console.log(image);
    await fs.unlink(`public/images/${image}`);
    await PostModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Post Supprimé" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  const { userId } = req.body;
  const { file } = req;

  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post inexistant" });
    const admin = await AdminModel.findById(userId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
   

    const updatePost = {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/public/images/${
        file.filename
      }`,
    };
    console.log(updatePost)
/*
    const image = post.imageUrl.split("images/")[1];
    await fs.unlink(`public/images/${image}`);
    await PostModel.updateOne(
      { _id: req.params.id },
      { ...updatePost, _id: req.params.id }
    );.
    */
   // res.status(201).json({ message: "Post mis à jour" });
  } catch (error) {
    // ** Si erreur on retourne un erreur 500 avec l'erreur qui à été géneré
    res.status(500).json(error);
  }
};