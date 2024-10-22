let bag = [];
let badge = document.getElementById("badge");
let div_badge = document.getElementById("div_badge");

// função que executa no carregamento do componente
document.addEventListener("DOMContentLoaded", function () {
  // pegando os livros que estao na sacola no localstorage
  bag = JSON.parse(localStorage.getItem("bag"));

  if (bag) {
    // tornando o bdge visivel
    div_badge.style.visibility = "visible";
    // colocando o numero de livros no badge
    badge.innerText = bag.length;
  } else {
    div_badge.style.visibility = "hidden";
  }

  // pegando o usuário logado do localstorage
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  // ajustando a disponbilidade dos elementos de acordo com o perfil do usuário logado
  if (loggedUser.email != "admin@admin.com") {
    let usuarios = document.getElementById("usuarios-header");
    let livros = document.getElementById("livros-header");

    usuarios.style.display = "none";
    livros.style.display = "none";
  } else {
    let alugar = document.getElementById("alugar-header");
    let devolver = document.getElementById("devolver-header");

    alugar.style.display = "none";
    devolver.style.display = "none";
  }
});

// adiciona um livro a sacola
function addToBag(book_str) {
  book = JSON.parse(book_str);
  if (!bag) {
    bag = [];
  }

  // verificando se o livro ja existe
  const exists = bag.find((b) => b.id == book.id);

  if (exists) {
    showToast("Livro já está na sacola");
  } else {
    bag.push(book);
    div_badge.style.visibility = "visible";
    badge.innerText = bag.length;

    // atualiza o local storage
    localStorage.setItem("bag", JSON.stringify(bag));
    showToast("Livro adicionado a sacola");
  }
}

// remove o livro da sacola
function removeFromBag(id) {
  const exists = bag.find((b) => b.id == id);

  if (exists) {
    bag = bag.filter((b) => b.id != exists.id);
    if (bag.length) {
      div_badge.style.visibility = "visible";
      badge.innerText = bag.length;
    } else {
      localStorage.removeItem("bag");
      div_badge.style.visibility = "hidden";
      window.location.href = `rent.php`;
    }
    // atualiza o localstorage
    localStorage.setItem("bag", JSON.stringify(bag));
  } else {
    console.log("Livro não esta na sacola!");
  }
}

// funçao de logou, apenas volta pra tela de login e apaga o localstorage
function logout() {
  window.location.href = "index.php";
  localStorage.removeItem("bag");
  localStorage.removeItem("user");
}

// funçã que navega a tela onde detalha os livros que estao na sacola
function openBag() {
  if (bag) {
    window.location.href = `bag.php`;
  } else {
    console.log("Sacola vazia");
  }
}
