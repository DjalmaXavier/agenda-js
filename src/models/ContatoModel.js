const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "" },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.erros = [];
    this.contato = null;
  }

  async register() {
    this.valid();
    if (this.erros.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
  }

  async edit(id) {
    if (typeof id !== "string") return;

    this.valid();

    if (this.erros.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }

  valid() {
    this.cleanUp();
    //Verificar e-mail
    if (this.body.email && !validator.isEmail(this.body.email))
      this.erros.push("- E-mail invalido");
    //Nome precisa ser maior do que 0
    if (!this.body.nome) this.erros.push("- Nome é obrigatorio.");
    if (!this.body.email && !this.body.telefone)
      this.erros.push("- É necessário incluir telefone e/ou e-mail");
  }

  cleanUp() {
    for (const k in this.body) {
      if (typeof this.body[k] !== "string") {
        this.body[k] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    };
  }

  //metodos estaticos

  static async searchFromId(id) {
    if (typeof id !== "string") return;
    return await ContatoModel.findById(id);
  }
  static async searchContacts() {
    const contatos = ContatoModel.find().sort({ criadoEm: -1 });
    return contatos;
  }

  static async delete(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id });
    return contato;
  }
}

module.exports = Contato;
