export const openNewPostModal = () => {
  const button_newPost = document.querySelector("#user__newpost");
  const modalController_newPost = document.querySelector(
    ".modal__controller--newPost"
  );

  button_newPost.addEventListener("click", () => {
    modalController_newPost.showModal();
    closeModal();
  });
};

export const closeModal = () => {
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
