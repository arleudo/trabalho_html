// função que carrega na inicialização da pagina
document.addEventListener("DOMContentLoaded", function () {
  // pegando os campos
  let username = document.getElementById("user-name");
  let useremail = document.getElementById("user-email");

  // pega o usuário logado do localstorage
  const user = JSON.parse(localStorage.getItem("user"));

  // preenche os campos com o nome e o email do usuário
  username.textContent = user.name;
  useremail.textContent = user.email;
});
