let loggedUser = undefined;

document.addEventListener("DOMContentLoaded", function () {
  loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email != "admin@admin.com") {
    const usuarios = document.getElementById("usuarios");
    const livros = document.getElementById("livros");

    usuarios.style.pointerEvents = "none";
    usuarios.style.opacity = "0.5";
    livros.style.pointerEvents = "none";
    livros.style.opacity = "0.5";
  }
});
