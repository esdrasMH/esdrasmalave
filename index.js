const body = document.querySelector("body");
const iconoAbrir = document.querySelector("header button img.icono-menu-abrir");
const iconoCerrar = document.querySelector(
  "header button img.icono-menu-cerrar"
);
const menuOpciones = document.querySelector("header nav");
const opciones = document.querySelectorAll("header nav ul li");
const estilos = window.getComputedStyle(menuOpciones);

function abrirMenu() {
  if (estilos.display !== "none") return cerrarMenu();

  body.style.overflow = "hidden";
  iconoAbrir.style.display = "none";
  iconoCerrar.style.display = "block";
  menuOpciones.classList.add("menu-abierto");

  opciones.forEach((o) => {
    o.addEventListener("click", () => cerrarMenu());
  });
}

function cerrarMenu() {
  body.style.overflow = "auto";
  iconoAbrir.style.display = "block";
  iconoCerrar.style.display = "none";
  menuOpciones.classList.remove("menu-abierto");

  opciones.forEach((o) => {
    o.removeEventListener("click", () => cerrarMenu());
  });
}

function manejadorEnvio(event) {
  event.preventDefault();

  const form = event.target;

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(form)).toString(),
  })
    .then(() => {
      document.querySelector(".mensaje-exitoso").style.display = "block";
      form.reset();
    })
    .catch(() => {
      document.querySelector(".mensaje-error").style.display = "block";
    });

  gtag("event", "click", {
    event_category: "Form",
    event_label: "Enviar",
  });
}

document.addEventListener("scroll", function () {
  const experiencia = document.querySelector("#experiencia");
  const educacion = document.querySelector("#educacion");
  const habilidades = document.querySelector("#habilidades");
  const sobreMi = document.querySelector("#sobre-mi");

  if (experiencia && window.scrollY >= experiencia.offsetTop) {
    gtag("event", "view", {
      event_category: "Section",
      event_label: "Experiencia",
    });
  }
  if (educacion && window.scrollY >= educacion.offsetTop) {
    gtag("event", "view", {
      event_category: "Section",
      event_label: "Educación",
    });
  }
  if (habilidades && window.scrollY >= habilidades.offsetTop) {
    gtag("event", "view", {
      event_category: "Section",
      event_label: "Habilidades",
    });
  }
  if (sobreMi && window.scrollY >= sobreMi.offsetTop) {
    gtag("event", "view", {
      event_category: "Section",
      event_label: "Sobre mí",
    });
  }
});
