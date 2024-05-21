const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.registra();

    if (login.erros.length > 0) {
      req.flash("erros", login.erros);
      req.session.save(() => {
        return res.redirect("/login/index");
      });
      return;
    } else {
      console.log("Usuario criado");
      req.flash("sucesso", "Seu usuário foi criado com sucesso.");
      req.session.save(() => {
        return res.redirect("/login/index");
      });
    }
  } catch (error) {
    console.log(error);
  }
};
