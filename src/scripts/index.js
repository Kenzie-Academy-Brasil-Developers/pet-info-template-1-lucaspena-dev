// Desenvolva as funcionalidades de login aqui

import { loginRequest } from "./requests.js";

const handleLogin = () => {
  const email = document.querySelector("#Email");
  const pass = document.querySelector("#Senha");
  const wrongEmail = document.querySelector("#wrong-email");
  const wrongPass = document.querySelector("#wrong-password");
  const button = document.querySelector("#login__submit");
  let count = 0;

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

    location.href = "./src/pages/register.html";
  });
};

handleLogin();
handleRegisterButton();
