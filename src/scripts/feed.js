import { getCurrentUserInfo } from "./requests.js";
import { renderAllPosts, renderUserInfo} from "./render.js";
import { openNewPostModal } from "./modal.js";

const authentication = () => {
  const token = localStorage.getItem("@petinfo:token");

  if (!token) {
    location.replace("../../");
  }
};

const showUserMenu = () => {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");

  userAction.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    
    menu.addEventListener("click", () => {
      localStorage.removeItem("@petinfo:token");
      location.replace("../../");
    });
  });
};

const main = async () => {
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  await renderAllPosts();
};


await main();
authentication();
openNewPostModal();
renderUserInfo(await getCurrentUserInfo());