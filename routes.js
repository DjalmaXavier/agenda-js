const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController.js");

const { checkUser } = require("./src/middlewares/middleware.js");

// Rotas da home
route.get("/", homeController.index);

//Rotas de login
route.get("/login/index", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/enter", loginController.login);
route.get("/login/logout", loginController.logout);

//Rotas de contato
route.get("/contato/index", checkUser, contatoController.index);
route.post("/contato/register", checkUser, contatoController.register);
route.get("/contato/index/:id", checkUser, contatoController.idParam);

module.exports = route;
