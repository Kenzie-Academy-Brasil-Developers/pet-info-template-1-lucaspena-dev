import { renderAllPosts } from "./render.js";

const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

// Desenvolva as funcionalidades de requisições aqui

export const createNewUser = async (requestBody) => {
  const newUser = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const responseConverted = await response.json();

      if (response.ok) {
        alert("Usuário criado com sucesso!");
        await renderAllPosts(responseConverted);
        return responseConverted;
      } else {
        throw new Error(responseConverted.message);
      }
    })
    .catch((erro) => alert(erro.message));

  return newUser;
};

export const loginRequest = async (requestBody) => {
  const token = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const responseConverted = await response.json();

      if (response.ok) {
        alert("Logado com sucesso!");
        localStorage.setItem("@petinfo:token", responseConverted.token);
        location.replace("./src/pages/feed.html");
      } else {
        throw new Error(responseConverted.message);
      }
    })
    .catch((erro) => {
      const email = document.querySelector("#Email");
      const pass = document.querySelector("#Senha");
      const wrongEmail = document.querySelector("#wrong-email");
      const wrongPass = document.querySelector("#wrong-password");

      if (email.value.trim() === "" && pass.value.trim() === "") {
        wrongEmail.classList.toggle("hidden");
        wrongPass.classList.toggle("hidden");

        wrongEmail.innerText = "O email está incorreto";
        wrongPass.innerText = "A senha está incorreta";
        setTimeout(() => {
          wrongEmail.classList.toggle("hidden");
          wrongPass.classList.toggle("hidden");
        }, 3000);
      } else if (erro.message === "O email está incorreto") {
        wrongEmail.classList.toggle("hidden");
        wrongEmail.innerText = erro.message;

        setTimeout(() => {
          wrongEmail.classList.toggle("hidden");
        }, 3000);
      } else if (erro.message === "A senha está incorreta") {
        wrongPass.classList.toggle("hidden");
        wrongPass.innerText = erro.message;
        
        setTimeout(() => {
          wrongPass.classList.toggle("hidden");
        }, 3000);
      }
    });

  return token;
};

export const createNewPost = async (requestBody) => {
  const post = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const responseConverted = await response.json();

      if (response.ok) {
        return responseConverted;
      } else {
        throw new Error(responseConverted.message);
      }
    })
    .catch((erro) => alert(erro.message));

  return post;
};

export const acessPost = async (id) => {
  const post = await fetch(`${baseUrl}/posts/${id}`, {
    method: "GET",
    headers: requestHeaders,
  })
    .then(async (response) => {
      const responseConverted = await response.json();

      if (response.ok) {
        return responseConverted;
      } else {
        throw new Error(responseConverted.message);
      }
    })
    .catch((erro) => alert(erro.message));

  return post;
};
