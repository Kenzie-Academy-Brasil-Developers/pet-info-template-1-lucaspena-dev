export const sucess = '<i class="fas fa-check-circle toast-check"></i>';
export const error = '<i class="fa-solid fa-circle-exclamation toast-check"></i>';
export const green = "#087F5B";
export const red = "#c83751";
export const blue = "#364fc7"

export const toastLog = (validation, message, color) => {
  Toastify({
    text: `<h2 class="toast-title--only">${validation} ${message}</h2>`,
    escapeMarkup: false,
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffff",
      color: color,
      "line-height": "1.25rem",
      padding: "0.8rem 0.8rem",
      border: `3px solid ${color}`,
      "border-radius": "0.25rem",
    },
  }).showToast();
};

export const toastReg = (validation, message, color) => {
  const verify = (check) => {
    if (check === sucess) {
      return '<p class="toast-paragraph--register">Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a class="toast-anchor" href="../../">Acessar página de login</a></p>';
    }
    return "";
  };

  Toastify({
    text: `<h2 class="toast-title">${validation} ${message}</h2>
    ${verify(validation)}`,
    escapeMarkup: false,
    duration: 15000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffff",
      color: color,
      "line-height": "1.25rem",
      "text-align": "justify",
      padding: "1.16rem",
      border: `3px solid ${color}`,
      "border-radius": "0.25rem",
    },
  }).showToast();
};

export const toast = (validation, message, color) => {
  const verify = (check) => {
    if(check === sucess){
      return `<h2 class="toast-title--only">${validation} ${message}</h2>`
    } else if (check === error) {
      return `<h2 class="toast-title--only">${validation} ${message}</h2>`
    } else {
      return `${message}`
    }
  }

  Toastify({
    text: `${verify(validation)}`,
    escapeMarkup: false,
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffff",
      color: color,
      "line-height": "1.25rem",
      "text-align": "justify",
      padding: "0.8rem 0.8rem",
      border: `3px solid ${color}`,
      "border-radius": "0.25rem",
    },
  }).showToast();
};
