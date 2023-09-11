import { blue, green, sucess, toast } from "./toast.js";
import {
  createNewPost,
  deletePostbyId,
  editPost,
  getCurrentUserInfo,
  getPostById,
} from "./requests.js";
import { renderAllPosts, renderModalPost, renderUserInfo } from "./render.js";
import { closeModal, openNewPostModal } from "./modal.js";

const postSection = document.querySelector(".posts");

const authentication = () => {
  const token = localStorage.getItem("@petinfo:token");

  if (!token) {
    location.replace("../../");
  }
};

const showUserMenu = () => {
  const openMenu = document.querySelector(".user__image");
  const button = document.querySelector(".logout__button");
  const showMenu = document.querySelector(".user__logout");

  openMenu.addEventListener("click", () => {
    showMenu.classList.toggle("hidden");
  });

  button.addEventListener("click", () => {
    localStorage.removeItem("@petinfo:token");
    toast(null, "Você foi deslogado com sucesso!", blue);

    setTimeout(() => {
      location.replace("../../");
    }, 1500);
  });
};

const main = async () => {
  postSection.innerHTML = "";
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  await renderAllPosts();
};

const handleNewPostModal = () => {
  openNewPostModal();

  const cancelButton = document.querySelector("#cancel__button");
  const createPostButton = document.querySelector("#createPost__button");
  const posts = document.querySelector(".posts");
  const inputs = document.querySelectorAll(".input__newpost");

  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      input.value = "";
    });
  });

  createPostButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#modalPost__title");
    const content = document.querySelector("#modalPost__content");
    const emptyTitle = document.querySelector("#empty-title");
    const emptyContent = document.querySelector("#empty-content");

    const newPost = {
      title: title.value,
      content: content.value,
    };

    if (newPost.title.trim() === "" && newPost.content.trim() === "") {
      emptyTitle.classList.toggle("hidden");
      emptyContent.classList.toggle("hidden");

      setTimeout(() => {
        emptyTitle.classList.toggle("hidden");
        emptyContent.classList.toggle("hidden");
      }, 3000);

      return;
    } else if (newPost.title.trim() === "") {
      emptyTitle.classList.toggle("hidden");

      setTimeout(() => {
        emptyTitle.classList.toggle("hidden");
      }, 3000);

      return;
    } else if (newPost.content.trim() === "") {
      emptyContent.classList.toggle("hidden");

      setTimeout(() => {
        emptyContent.classList.toggle("hidden");
      }, 3000);

      return;
    } else {
      await createNewPost(newPost);

      modalController.close();

      inputs.forEach((input) => {
        input.value = "";
      });

      posts.innerHTML = "";
      renderAllPosts();
    }
  });
};

export const handlePostModal = async () => {
  const accessPublication = document.querySelectorAll(".post__open");
  const modalController_post = document.querySelector(
    ".modal__controller--post"
  );

  const modal = document.querySelector("#user");

  accessPublication.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postID = event.target.dataset.id;

      renderModalPost(await getPostById(postID));
      modal.innerHTML = "";

      modalController_post.showModal();
      closeModal();
    });
  });
};

export const updateEditModal = async () => {
  const buttons = document.querySelectorAll(".post__button--edit");
  const submitButton = document.querySelector("#submitEditPost__button");

  const title = document.querySelector("#editPost-title");
  const content = document.querySelector("#editPost-content");

  const modalController = document.querySelector(
    ".modal__controller--editPost"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postId = event.target.dataset.id;
      submitButton.dataset.id = postId;
      const getPostData = await getPostById(postId);

      title.value = getPostData.title;
      content.value = getPostData.content;

      modalController.showModal();
      closeModal();
    });
  });
};

const handleEditPostModal = () => {
  const cancelButton = document.querySelector("#editCancel__button");
  const submitButton = document.querySelector("#submitEditPost__button");

  const title = document.querySelector("#editPost-title");
  const content = document.querySelector("#editPost-content");
  const emptyTitle = document.querySelector("#empty-editTitle");
  const emptyContent = document.querySelector("#empty-editContent");

  const modalController = document.querySelector(
    ".modal__controller--editPost"
  );

  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();

    title.value = "";
    content.value = "";
  });

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const postId = submitButton.dataset.id;
    const updatePost = {
      title: title.value,
      content: content.value,
    };

    if (updatePost.title.trim() === "" && updatePost.content.trim() === "") {
      emptyTitle.classList.toggle("hidden");
      emptyContent.classList.toggle("hidden");

      setTimeout(() => {
        emptyTitle.classList.toggle("hidden");
        emptyContent.classList.toggle("hidden");
      }, 3000);

      return;
    } else if (updatePost.title.trim() === "") {
      emptyTitle.classList.toggle("hidden");

      setTimeout(() => {
        emptyTitle.classList.toggle("hidden");
      }, 3000);

      return;
    } else if (updatePost.content.trim() === "") {
      emptyContent.classList.toggle("hidden");

      setTimeout(() => {
        emptyContent.classList.toggle("hidden");
      }, 3000);

      return;
    } else {
      await editPost(postId, updatePost);
      modalController.close();
      postSection.innerHTML = "";
      renderAllPosts();
      toast(sucess, "Post editado com sucesso!", green);
    }
  });
};

export const updateDeletePost = () => {
  const buttons = document.querySelectorAll(".post__button--delete");
  const submitButton = document.querySelector("#deletePost__button");
  const modalController = document.querySelector(
    ".modal__controller--deletePost"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      modalController.showModal();
      closeModal();
      submitButton.dataset.id = event.target.dataset.id;
    });
  });
};

const handleDeletePost = () => {

};

authentication();
await main();
renderUserInfo(await getCurrentUserInfo());
handleNewPostModal();
handleEditPostModal();
