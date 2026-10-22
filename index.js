const botonMenu = document.querySelector(".boton-menu");
const navegacion = document.querySelector("#navegacion");
const movil = window.matchMedia("(max-width: 600px)");
function cambiarMenu(abierto) {
  botonMenu.setAttribute("aria-expanded", String(abierto));
  botonMenu.textContent = abierto ? "Cerrar menú" : "Menú";
  navegacion.hidden = movil.matches && !abierto;
}
function adaptarMenu() {
  botonMenu.hidden = !movil.matches;
  cambiarMenu(false);
}
botonMenu.addEventListener("click", () => cambiarMenu(botonMenu.getAttribute("aria-expanded") !== "true"));
navegacion.addEventListener("click", (event) => {
  if (event.target.closest("a")) cambiarMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && movil.matches && botonMenu.getAttribute("aria-expanded") === "true") {
    cambiarMenu(false);
    botonMenu.focus();
  }
});
movil.addEventListener("change", adaptarMenu);
adaptarMenu();
document.querySelector("#anio").textContent = new Date().getFullYear();

const formulario = document.querySelector('form[name="contact"]');
const estado = document.querySelector("#estado-envio");
formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (formulario.getAttribute("aria-busy") === "true") return;
  const boton = formulario.querySelector('[type="submit"]');
  boton.disabled = true;
  formulario.setAttribute("aria-busy", "true");
  estado.dataset.estado = "enviando";
  estado.textContent = "Enviando tu mensaje…";
  try {
    const respuesta = await fetch(formulario.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(formulario)).toString(),
    });
    if (!respuesta.ok) throw new Error("El servidor no confirmó el envío");
    estado.dataset.estado = "exito";
    estado.textContent = "¡Gracias! Tu mensaje se ha enviado correctamente.";
    formulario.reset();
  } catch {
    estado.dataset.estado = "error";
    estado.textContent = "No se pudo confirmar el envío. Tus datos se conservan para que puedas intentarlo de nuevo.";
  } finally {
    boton.disabled = false;
    formulario.removeAttribute("aria-busy");
  }
});
