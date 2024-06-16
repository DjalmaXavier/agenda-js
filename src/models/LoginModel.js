const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

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

  async login() {
    if (this.erros.length > 0) return;

    this.users = await LoginModel.findOne({ email: this.body.email });

    if (!this.users) {
      this.erros.push("Usuario invalido");
      return;
    }
    if (!bcryptjs.compareSync(this.body.senha, this.users.senha)) {
      this.erros.push("Senha invalida");
      this.users = null;
      return;
    }
  }

  async register() {
    this.valid();
    if (this.erros.length > 0) return;

    //Verifica se já existe e-mail na base
    await this.userExist();

    //Verifica novamente se foi encontrado um erro durante a verificação do usuario
    if (this.erros.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
    return await LoginModel.create(this.body);
  }

  valid() {
    this.cleanUp();
    //Verificar e-mail
    if (!validator.isEmail(this.body.email))
      this.erros.push("- E-mail invalido");
    //Senha precisa ter 3 a 20 caracteres
    if (this.body.senha.length < 4 || this.body.senha.length > 20) {
      this.erros.push("- Senha precisa ter entre 4 a 20 caracteres");
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

  async userExist() {
    this.users = await LoginModel.findOne({ email: this.body.email });

    if (this.users) {
      this.erros.push("- Usuário já cadastrado.");
    }
  }
}

module.exports = Login;
