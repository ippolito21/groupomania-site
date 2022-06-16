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


exports.likes = async (req, res) => {
  // ** On recupere l'identifiant de la sauce depuis les parametre de l'url
  const id = req.params.id;
  // **On extrait le like ainsi que le userId depuis le corps de la requete
  const { like, userId } = req.body;
  try {
    const post = await PostModel.findById(id)
    if(!post) return res.status(404).json({message : "Post non trouvé"})
    if(like === 1){
      if(!post.usersLiked.includes(userId)){
        await PostModel.updateOne({_id : id}, { $push : {usersLiked : userId}, $inc : {likes : 1}})
      }
    }
  } catch (error) {
    
  }
}