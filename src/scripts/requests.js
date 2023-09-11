import {
  toastReg,
  toastLog,
  green,
  toast,
  red,
  sucess,
  error,
  toastDel,
} from "./toast.js";

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
        toastReg(sucess, "Sua conta foi criada sucesso!", green);
        return responseConverted;
      } else {
        throw new Error(responseConverted.message);
      }
    })
    .catch((erro) => toastReg(error, erro.message, red));

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
        toastLog(sucess, `Logado com sucesso!`, green);
        localStorage.setItem("@petinfo:token", responseConverted.token);

        setTimeout(() => {
          location.replace("./src/pages/feed.html");
        }, 1500);

        return responseConverted;
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

export const getPostById = async (postId) => {
  const post = await fetch(`${baseUrl}/posts/${postId}`, {
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
    .catch((erro) => toast(error, erro.message, red));

  return post;
};

export const editPost = async (postId, requestBody) => {
  const editPost = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "PATCH",
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
    .catch((erro) => toast(error, erro.message, red));

  return editPost;
};

export const deletePostbyId = async (postId) => {
  const deletePost = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "DELETE",
    headers: requestHeaders,
  }).then(async (response) => {
    const responseConverted = await response.json();

    if (response.ok) {
      toastDel(sucess, `${responseConverted.message}!`, green);
    } else {
      toastDel(error, responseConverted.message, green);
    }
  });

  return deletePost;
};
