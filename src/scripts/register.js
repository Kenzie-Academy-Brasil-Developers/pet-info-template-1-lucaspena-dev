// Desenvolva as funcionalidades de cadastro aqui

import { createNewUser } from "./requests.js";

const handleRegister = () => {
  const inputs = document.querySelectorAll(".input__register");
  const button = document.querySelector("#register__submit");

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    
    const newUser = {};

    inputs.forEach((input) => {
      newUser[input.name] = input.value;
    });

    await createNewUser(newUser);
  });
};

const handleRedirectButton = () => {
  const button = document.querySelector("#redirect__button");

  button.addEventListener("click", (event) => {
    event.preventDefault()
    location.href = "../../index.html";
  });
};

handleRegister();
handleRedirectButton();
