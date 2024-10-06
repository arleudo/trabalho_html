document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-container").classList.toggle("menu-active");
});

function openDialog() {
  document.getElementById('dialog').style.display = 'flex';
}

function closeDialog() {
  document.getElementById('dialog').style.display = 'none';
}

function saveUser() {
  console.log("Usuário salvo com sucesso");
  closeDialog();
}
