const validator = require("validator");

export default class Verify {
  constructor(formClass) {
    this.formName = formClass;
    this.form = document.querySelector(formClass);
    this.erros = [];
  }

  init() {
    this.preventEvents();
  }

  preventEvents() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.check(e);
    });
  }

  check(e) {
    const el = e.target;
    let error = false;
    let pClass;

    const email = el.querySelector('input[name="email"]');
    const senha = el.querySelector('input[name="senha"]');

    const errorMsg = document.getElementById("error-message");

    if (this.formName === ".form-register") {
      pClass = ".pointer-register";
    } else {
      pClass = ".pointer-login";
    }

    const p = document.querySelector(pClass);
    console.log(p);

    if (errorMsg) {
      this.erros = [];
      errorMsg.remove();
    }

    if (!validator.isEmail(email.value)) this.erros.push("E-mail invalido");
    //Senha precisa ter 3 a 20 caracteres
    if (senha.value < 4 || senha.value > 20) {
      this.erros.push("Senha precisa ter entre 4 a 20 caracteres");
    }

    if (this.erros.length > 0) {
      const div = document.createElement("div");

      div.className = "controle col my-3";
      div.id = "error-message";

      for (let erro of this.erros) {
        const p = document.createElement("p");
        p.textContent = erro;
        p.className = "alert alert-danger";
        div.appendChild(p);
      }
      p.appendChild(div);
      error = true;
    }

    if (!error) el.submit();
  }
}
