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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  }).then(async (response) => {
    const responseConvert = await response.json();

    if (response.ok) {
      alert("Logado com sucesso!");
      localStorage.setItem("@petinfo:token", responseConvert.token);
      location.replace("./src/pages/feed.html");
    } else {
      alert("Ops")
    }
  })

  return token;
};
