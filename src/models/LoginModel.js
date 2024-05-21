const mongoose = require("mongoose");
const validator = require("validator");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.erros = [];
    this.users = null;
  }

  async registra() {
    this.valida();
    if (this.erros.length > 0) {
      console.log(this.erros);
      return;
    }
    try {
      this.users = await LoginModel.create(this.body);
    } catch (error) {
      console.log(error);
    }
  }

  valida() {
    this.cleanUp();
    //Verificar e-mail
    if (!validator.isEmail(this.body.email)) this.erros.push("E-mail invalido");
    //Senha precisa ter 3 a 20 caracteres
    if (this.body.senha.length < 4 || this.body.senha.length > 20) {
      this.erros.push("Senha precisa ter entre 4 a 20 caracteres");
    }
  }

  cleanUp() {
    for (const k in this.body) {
      if (typeof this.body[k] !== "string") {
        this.body[k] = "";
      }
    }

    this.body = {
      email: this.body.email,
      senha: this.body.senha,
    };
  }
}

module.exports = Login;
