let loggedUser = undefined;

// função que carrega na inicialização da pagina
document.addEventListener("DOMContentLoaded", function () {
  // pegando o usuário logado
  loggedUser = JSON.parse(localStorage.getItem("user"));

  // definindo o comportamento dos cards de acordo com o usuário logado e suas permissões
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
