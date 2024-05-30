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

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render("404");
  try {
    const contato = new Contato(req.body);

    await contato.edit(req.params.id);

    if (contato.erros.length > 0) {
      req.flash("erros", contato.erros);
      req.session.save(() => {
        return res.redirect("/contato/index");
      });
      return;
    }

    req.flash("sucesso", "Contato alterado com sucesso!");
    req.session.save(() => {
      return res.redirect(`/contato/index/${contato.contato._id}`);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render("404");
  const contato = await Contato.delete(req.params.id);

  if (!contato) {
    return res.render("404");
  }

  req.flash("sucesso", "Contato deletado com sucesso!");
  req.session.save(() => {
    return res.redirect("/");
  });
};
