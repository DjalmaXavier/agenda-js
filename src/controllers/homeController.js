const Contato = require("../models/ContatoModel");

exports.index = async (req, res) => {
  const agenda = await Contato.searchContacts();
  res.render("index", { agenda });
};
