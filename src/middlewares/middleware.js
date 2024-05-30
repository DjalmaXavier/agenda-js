exports.middlewareGlobal = (req, res, next) => {
  res.locals.erros = req.flash("erros");
  res.locals.sucesso = req.flash("sucesso");
  res.locals.usuario = req.session.user;
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.render("404");
  }
};

exports.checkUser = (req, res, next) => {
  if (!req.session.user) {
    req.flash("erros", "Você precisa fazer login");
    req.session.save(() => res.redirect("/"));
    return;
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
