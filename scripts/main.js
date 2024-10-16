let loggedUser = undefined;

document.addEventListener("DOMContentLoaded", function () {
  loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email != "admin@admin.com") {
    let usuarios = document.getElementById("usuarios");
    let livros = document.getElementById("livros");

    usuarios.style.pointerEvents = "none";
    usuarios.style.opacity = "0.5";
    livros.style.pointerEvents = "none";
    livros.style.opacity = "0.5";
  } else {
    let alugar = document.getElementById("alugar");
    let devolver = document.getElementById("devolver");

    alugar.style.pointerEvents = "none";
    alugar.style.opacity = "0.5";
    devolver.style.pointerEvents = "none";
    devolver.style.opacity = "0.5";
  }
});
