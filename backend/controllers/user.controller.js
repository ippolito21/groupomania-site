/*le fichier gère toute la logique concernant l'inscription et la connexion*/
const express = require("express");
/*importe le paquet algorithmes de hachage sécurisé et on le stock dans la variable bcrypt */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//récupére le jeton, le token
const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const userValidation = require("../validation/user.validation");

//documentation
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
// ** Controlleur inscription
exports.signup = async (req, res) => {
  // recupere le corps de la requete (données issus du front)
  const body = { ...req.body };
  const file = req.file;
  console.log(body);

  const { error } = userValidation(body).userSchemaSignup;
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    // ** Hash le mot de passe avec bcrypt
    const hash = await bcrypt.hash(body.password, 10);
    // ** on crée un nouvel utilisateur basé sur le model User
    await new UserModel({
      username: body.username,
      email: body.email,
      password: hash,
      imageUrl: `${req.protocol}://${req.get("host")}/public/images/${
        req.file.filename
      }`,
    }).save();
    // *** On renvoie un reponse avec le status de 201 => created Ressource
    res.status(201).json({ message: "Compte crée!" });
  } catch (error) {
    // ** On cas d'erreur on renvoie un reponse 500 => Internal server error
    res.status(500).json(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
// ** Controlleur de connexion
exports.login = async (req, res) => {
  // recupere le corps de la requete (données issus du front)
  const body = req.body;
  const { error } = userValidation(body).userSchemLogin;
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    // ** On recherche un utilisateur de par son email
    const user = await UserModel.findOne({ email: body.email });
    // ** On renvoi une erreur si on trouve pas l'utilisateur dans notre base de données
    if (!user)
      return res.status(401).json({ message: "Connexion non autorisée" });
    // ** On compare le mot de passe clair avec le mot de passe hashé
    const isPasswordMatching = await bcrypt.compare(
      body.password,
      user.password
    );
    // Si ça renvoie false on retoure une erreur 401 avec le message Connexion
    if (!isPasswordMatching)
      return res.status(401).json({ message: "Connexion non autorisée" });
    // *** Si tout est bon on renvoie un token de connexion, extrait l'id de l'utilisateur qui est encodé dans le token
    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "5h",
      }),
      //authentification le serveur vérifie que le token de l'utilisateur est valide signé,avec le code secret
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.profile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id, "-password -__v");
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId;
  try {
    const user = await UserModel.findById(id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    if (userId !== user._id.toString()) {
      return res.status(403).json({ message: "action interdite" });
    }
    await PostModel.deleteMany({
      userId: {
        $in: user._id,
      },
    });
    await UserModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Compte supprimé!" });
  } catch (error) {
    res.status(500).json(error);
  }
};
