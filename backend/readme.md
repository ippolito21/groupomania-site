# API Groupomania

## NOTE D'utilisation

- Cloner le Repo Github : [ICI](https://github.com/ippolito21/groupomania-site.git)
- Installation des dépendences  :  **npm install ou npm i**
- Renommer le fichier **dotenv** en **.env** en mettant les valeurs associées à chaque variable d'environnement
- Lancer le serveur de developpement : **npm start**
- Le serveur **doit** tourner sur le port **8080**
- Si le dossier public/images n'est pas présent, il faut le créer, sans
quoi le projet ne pourra pas fonctionner correctement

## Infos supplementaires

- La base de données est sur le cloud ***MongoDB Atlas***
- L'authentification est assurée par ***Passport***
- La gestion des mots de passe est assurée par ***Bcrypt***
- L'interaction avec la base de données est assurée ***Mongoose***

## Partie Administration
- Un compte administrateur est creé automatiquement lors de la premiere tentative de connexion en tant qu' administateur grace au valeur indiqué dans les variables d'environnements


## Technologies utilisées:


 ![Node Js](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png)
 ![MongoDB](https://www.lemagit.fr/visuals/LeMagIT/hero_article/MongoDB.jpg)
 ![Express](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png)
