// Desenvolva as funcionalidades de login aqui

import { loginRequest } from "./requests.js";

const authentication = () => {
  const token = localStorage.getItem("@petinfo:token");

  if (token) {
    location.replace("./src/pages/feed.html");
  }
};

const handleLogin = () => {
  const email = document.querySelector("#Email");
  const pass = document.querySelector("#Senha");
  const button = document.querySelector("#login__submit");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const emailValue = email.value;
    const passValue = pass.value;

    const user = {
      email: emailValue,
      password: passValue,
    };

    loginRequest(user);
  });
};

const handleRegisterButton = () => {
  const button = document.querySelector("#register__button");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    location.replace("./src/pages/register.html");
  });
};

authentication()
handleLogin();
handleRegisterButton();
