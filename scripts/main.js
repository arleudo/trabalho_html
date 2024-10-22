let loggedUser = undefined;

// função que carrega na inicialização da pagina
document.addEventListener("DOMContentLoaded", function () {
  // pegando o usuário logado
  loggedUser = JSON.parse(localStorage.getItem("user"));

  // definindo o comportamento dos cards de acordo com o usuário logado e suas permissões
  if (loggedUser.email != "admin@admin.com") {
    let usuarios = document.getElementById("usuarios");
    let livros = document.getElementById("livros");

    usuarios.style.display = "none";
    livros.style.display = "none";
  } else {
    let alugar = document.getElementById("alugar");
    let devolver = document.getElementById("devolver");

    alugar.style.display = "none";
    devolver.style.display = "none";
  }
});
