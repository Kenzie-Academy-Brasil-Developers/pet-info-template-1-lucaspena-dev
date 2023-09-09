// Desenvolva as funcionalidades de login aqui

import { loginRequest } from "./requests.js";

const handleLogin = () => {
  const email = document.querySelector("#Email");
  const pass = document.querySelector("#Senha");
  const button = document.querySelector("#login__submit");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const user = {
      email: email.value,
      password: pass.value,
    };

    loginRequest(user);
  });
};

const handleRegisterButton = () => {
  const button = document.querySelector("#register__button");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    location.href = "./src/pages/register.html";
  });
};

handleLogin();
handleRegisterButton();
