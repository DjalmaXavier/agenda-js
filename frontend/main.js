import "core-js/stable";
import "regenerator-runtime/runtime";
import Verify from "./modules/Verify";

const login = new Verify(".form-login");
const register = new Verify(".form-register");

register.init();
login.init();
