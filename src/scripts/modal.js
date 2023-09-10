import { acessPost, createNewPost } from "./requests.js";
import { renderAllPosts, renderModalPost } from "./render.js";

export const openNewPostModal = () => {
  const button = document.querySelector("#user__newpost");
  const modalController = document.querySelector(".modal__controller--newPost");

  button.addEventListener("click", () => {
    modalController.showModal();
    handleNewPostModal();
  });
};

const handleNewPostModal = () => {
  const cancelButton = document.querySelector("#cancel__button");
  const createPostButton = document.querySelector("#createPost__button");
  const posts = document.querySelector(".posts")
  const inputs = document.querySelectorAll(".input__newpost");
  const modalController = document.querySelector(".modal__controller--newPost");

  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      input.value = "";
    });

    modalController.close();
  });

  createPostButton.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.querySelector("#modalPost__title");
    const content = document.querySelector("#modalPost__content");
    let count = 0;

    const newPost = {
      title: title.value,
      content: content.value,
    };

    if (newPost.title.trim() === "" || newPost.content.trim() === "") {
      count++;
    }

    if (count !== 0) {
      alert("Ops");
    } else {
      createNewPost(newPost);
      posts.innerHTML = ""
      renderAllPosts();
      modalController.close();
    }
  });

  inputs.forEach((input) => {
    input.value = "";
  });

  handleCloseModal();
};

export const handleCloseModal = () => {
  const buttons = document.querySelectorAll(".modal__closeButton");
  const modalController = document.querySelectorAll(".modal__controller");

  modalController.forEach((controller) => {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        controller.close();
      });
    });
  });
};

export const handlePostModalAcess = () => {
  const accessPublication = document.querySelectorAll(".post__open");
  const modal = document.querySelector("#user");

  const modalController = document.querySelector(".modal__controller--post");

  accessPublication.forEach((button) => {
    button.addEventListener("click", async (event) => {
      modal.innerHTML = "";
      const postID = event.target.dataset.id;

      renderModalPost(await acessPost(postID));

      modalController.showModal();
    });
  });
};
