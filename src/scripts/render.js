import { getCurrentUserInfo, getAllPosts } from "./requests.js";
import { handlePostModal, updateDeletePost, updateEditModal } from "./feed.js";
import { closeModal } from "./modal.js";

// Renderiza todos os posts
export async function renderAllPosts() {
  const postSection = document.querySelector(".posts");
  postSection.innerHTML = "";
  const posts = await getAllPosts();

  posts.forEach(async (post) => {
    const postArticle = await renderPost(post, true);
    postSection.appendChild(postArticle);
    handlePostModal();
    updateEditModal();
    updateDeletePost();
  });
}

// Renderiza um post
async function renderPost(post) {
  const postContainer = document.createElement("article");
  postContainer.classList.add("post");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title", "text1", "bolder");
  postTitle.innerText = post.title;

  const postContent = document.createElement("p");
  postContent.classList.add("post__content", "text3");

  const postHeader = await renderPostHeader(post);

  postContent.classList.add("post__content--feed", "text3");
  postContent.innerText = post.content;

  const openButton = document.createElement("a");
  openButton.classList.add("post__open", "text3", "bold");
  openButton.innerText = "Acessar publicação";
  openButton.dataset.id = post.id;

  postContainer.append(postHeader, postTitle, postContent, openButton);

  return postContainer;
}

// Verifica a permissao do usuário para editar/deletar um post
async function checkEditPermission(authorID) {
  const { id } = await getCurrentUserInfo();

  if (Object.values({ id }, [0]).toString() == authorID) {
    return true;
  } else {
    return false;
  }
}

// Renderiza o cabeçalho de um post no feed
async function renderPostHeader(post) {
  const userInfo = post.user;

  const postDateInfo = handleDate(post.createdAt);

  const postHeader = document.createElement("header");
  postHeader.classList.add("post__header");

  const postInfo = document.createElement("div");
  postInfo.classList.add("post__info");

  const authorImage = document.createElement("img");
  authorImage.classList.add("post__author-image");
  authorImage.src = userInfo.avatar;

  const authorName = document.createElement("h2");
  authorName.classList.add("post__author-name", "text4", "bolder");
  authorName.innerText = userInfo.username;

  const divisor = document.createElement("small");
  divisor.innerText = "|";
  divisor.classList.add("post__date", "text4");

  const postDate = document.createElement("small");
  postDate.classList.add("post__date", "text4");
  postDate.innerText = postDateInfo;

  postInfo.append(authorImage, authorName, divisor, postDate);

  postHeader.appendChild(postInfo);

  const editable = await checkEditPermission(userInfo.id);

  if (editable) {
    const postActions = renderPostActions(post.id);
    postHeader.appendChild(postActions);
  }

  return postHeader;
}

// Renderiza as opções de "Editar" e "Deletar" caso o usuário seja dono do post
function renderPostActions(postID) {
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("post__actions");

  const editButton = document.createElement("button");
  editButton.classList.add(
    "post__button--edit",
    "btn",
    "btn--gray",
    "btn--small",
    "text4"
  );
  editButton.dataset.id = postID;
  editButton.innerText = "Editar";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "post__button--delete",
    "btn",
    "btn--gray",
    "btn--small",
    "text4"
  );
  deleteButton.dataset.id = postID;
  deleteButton.innerText = "Excluir";

  actionsContainer.append(editButton, deleteButton);

  return actionsContainer;
}

// Lida com a data atual
function handleDate(timeStamp) {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const date = new Date(timeStamp);
  const month = months.at(date.getMonth());
  const year = date.getFullYear();

  return `${month} de ${year}`;
}

export const renderUserInfo = (user) => {
  const username = document.querySelector(".user__uniquename");
  const avatar = document.querySelector(".user__image");

  username.innerText = `@${user.username.toLowerCase().replaceAll(" ", "")}`;
  avatar.src = user.avatar;
};

export const renderModalPost = async (data) => {
  const modal = document.querySelector("#user");

  const renderUserPost = async (post) => {
    const closeButton = document.createElement("button");
    closeButton.classList.add(
      "modal__closeButton",
      "btn--gray",
      "btn--gray-modal",
      "text3"
    );
    closeButton.innerText = "X";

    const postContainer = document.createElement("article");
    postContainer.classList.add("post");

    const postTitle = document.createElement("h2");
    postTitle.classList.add("post__title", "text1", "bolder");
    postTitle.innerText = post.title;

    const postContent = document.createElement("p");
    postContent.classList.add("post__content", "text3");

    const postHeader = await renderModalPostHeader(post);

    postContent.classList.add("post__content--modal", "text3");
    postContent.innerText = post.content;

    postContainer.append(postHeader, postTitle, postContent);

    modal.append(closeButton, postContainer);

    closeModal();

    return modal;
  };

  const renderModalPostHeader = async (post) => {
    const userInfo = post.user;

    const postDateInfo = handleModalDate(post.created_at);

    const postHeader = document.createElement("header");
    postHeader.classList.add("post__header");

    const postInfo = document.createElement("div");
    postInfo.classList.add("post__info");

    const authorImage = document.createElement("img");
    authorImage.classList.add("post__author-image");
    authorImage.src = userInfo.avatar;

    const authorName = document.createElement("h2");
    authorName.classList.add("post__author-name", "text4", "bolder");
    authorName.innerText = userInfo.username;

    const divisor = document.createElement("small");
    divisor.innerText = "|";
    divisor.classList.add("post__date", "text4");

    const postDate = document.createElement("small");
    postDate.classList.add("post__date", "text4");
    postDate.innerText = postDateInfo;

    postInfo.append(authorImage, authorName, divisor, postDate);

    postHeader.appendChild(postInfo);

    return postHeader;
  };

  const handleModalDate = (timeStamp) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const date = new Date(timeStamp);
    const month = months.at(date.getMonth());
    const year = date.getFullYear();

    return `${month} de ${year}`;
  };

  return renderUserPost(data);
};
