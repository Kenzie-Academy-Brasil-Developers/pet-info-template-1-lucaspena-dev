export const sucess = '<i class="fas fa-check-circle toast-check"></i>';
export const error = '<i class="fa-solid fa-circle-exclamation toast-check"></i>';
export const green = "#087F5B";
export const red = "#c83751";
export const blue = "#364fc7"

export const toastLog = (icon, message, color) => {
  Toastify({
    text: `<h2 class="toast-title--only">${icon} ${message}</h2>`,
    escapeMarkup: false,
    duration: 4000,
    className: "toastify-animation--top",
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffff",
      color: color,
      "line-height": "1.25rem",
      padding: "1.3125rem 2rem",
      border: `3px solid ${color}`,
      "border-radius": "0.25rem",
    },
  }).showToast();
};

export const toastReg = (icon, message, color) => {
  const verifyIcon = (currentIcon) => {
    if (currentIcon === sucess) {
      return '<p class="toast-paragraph--register">Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a class="toast-anchor" href="../../">Acessar página de login</a></p>';
    }
    return "";
  };

  Toastify({
    text: `<h2 class="toast-title">${icon} ${message}</h2>
    ${verifyIcon(icon)}`,
    escapeMarkup: false,
    duration: 10000,
    className: "toastify-animation--bottom",
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffff",
      color: color,
      "line-height": "1.25rem",
      "text-align": "justify",
      padding: "1.3125rem 2rem",
      border: `3px solid ${color}`,
      "border-radius": "0.25rem",
    },
  }).showToast();
};

export const toastDel = (icon, message, color) => {
  const verifyIcon = (currentIcon) => {
    if (currentIcon === sucess) {
      return '<p class="toast-paragraph--register">O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed.</p>';
    }
    return "";
  };

  Toastify({
    text: `<h2 class="toast-title">${icon} ${message}</h2>
    ${verifyIcon(icon)}`,
    escapeMarkup: false,
    duration: 5000,
    className: "toastify-animation--bottom",
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      display: "inline-flex",
      "flex-direction": "column",
      background: "#ffffff",
      color: color,
      gap: "1rem",
      "line-height": "1.25rem",
      "text-align": "justify",
      padding: "1.3125rem 2rem",
      border: `3px solid ${color}`,
      "border-radius": "0.25rem",
    },
  }).showToast();
}

export const toast = (icon, message, color) => {
  const verifyIcon = (currentIcon) => {
    if(currentIcon === sucess){
      return `<h2 class="toast-title--only">${icon} ${message}</h2>`
    } else if (currentIcon === error) {
      return `<h2 class="toast-title--only">${icon} ${message}</h2>`
    } else {
      return `${message}`
    }
  }

  Toastify({
    text: `${verifyIcon(icon)}`,
    escapeMarkup: false,
    duration: 4000,
    className: "toastify-animation--top",
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffff",
      color: color,
      "line-height": "1.25rem",
      "text-align": "justify",
      padding: "1.3125rem 2rem",
      border: `3px solid ${color}`,
      "border-radius": "0.25rem",
    },
  }).showToast();
};
