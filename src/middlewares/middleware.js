exports.middlewareGlobal = (req, res, next) => {
  res.locals.erros = req.flash("erros");
  res.locals.sucesso = req.flash("sucesso");
  res.locals.usuario = req.session.user;
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
