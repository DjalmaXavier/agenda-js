const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render("contato", {
    contato: {},
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.erros.length > 0) {
      req.flash("erros", contato.erros);
      req.session.save(() => {
        return res.redirect("/contato/index");
      });
      return;
    }

    req.flash("sucesso", "Contato registrado com sucesso!");
    req.session.save(() => {
      return res.redirect(`/contato/index/${contato.contato._id}`);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.idParam = async (req, res) => {
  if (!req.params.id) return res.render("404");
  const contato = await Contato.searchFromId(req.params.id);
  if (!contato) {
    return res.render("404");
  }
  res.render("contato", {
    contato,
  });
};
