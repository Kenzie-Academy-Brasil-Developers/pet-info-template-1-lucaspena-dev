// Desenvolva as funcionalidades de cadastro aqui

import { error, red, toast } from "./toast.js";
import { createNewUser } from "./requests.js";

const handleRegister = () => {
  const inputs = document.querySelectorAll(".input__register");
  const button = document.querySelector("#register__submit");
  let count = 0;

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const newUser = {};

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      newUser[input.name] = input.value;
    });

    if (count !== 0) {
      count = 0;
      return toast(error, "Por favor, preencha todos os campos!", red);
    } else {
      createNewUser(newUser);
    }
  });
};

const handleRedirectButton = () => {
  const button = document.querySelector("#redirect__button");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "../../index.html";
  });
};

handleRegister();
handleRedirectButton();
