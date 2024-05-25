const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.user) return res.render("index");
  return res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.erros.length > 0) {
      req.flash("erros", login.erros);
      req.session.save(() => {
        return res.redirect("/login/index");
      });
      return;
    }

    req.flash("sucesso", "Seu usuário foi criado com sucesso.");
    req.session.save(() => {
      return res.redirect("/login/index");
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.erros.length > 0) {
      req.flash("erros", login.erros);
      req.session.save(() => {
        return res.redirect("/login/index");
      });
      return;
    }

    req.flash("sucesso", "Login realizado com sucesso!");
    req.session.user = login.users;
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
