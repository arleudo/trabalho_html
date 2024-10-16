let bag = [];
let badge = document.getElementById("badge");
let div_badge = document.getElementById("div_badge");

document.addEventListener("DOMContentLoaded", function () {
  bag = JSON.parse(localStorage.getItem("bag"));

  if (bag) {
    div_badge.style.visibility = "visible";
    badge.innerText = bag.length;
  } else {
    div_badge.style.visibility = "hidden";
  }

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email != "admin@admin.com") {
    let usuarios = document.getElementById("usuarios-header");
    let livros = document.getElementById("livros-header");

    usuarios.style.pointerEvents = "none";
    usuarios.style.opacity = "0.5";
    livros.style.pointerEvents = "none";
    livros.style.opacity = "0.5";
  } else {
    let alugar = document.getElementById("alugar-header");
    let devolver = document.getElementById("devolver-header");

    alugar.style.pointerEvents = "none";
    alugar.style.opacity = "0.5";
    devolver.style.pointerEvents = "none";
    devolver.style.opacity = "0.5";
  }
});

function addToBag(book_str) {
  book = JSON.parse(book_str);
  if (!bag) {
    bag = [];
  }

  const exists = bag.find((b) => b.id == book.id);

  if (exists) {
    console.log("Livro ja esta na sacola!");
  } else {
    bag.push(book);
    div_badge.style.visibility = "visible";
    badge.innerText = bag.length;

    localStorage.setItem("bag", JSON.stringify(bag));
  }
}

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

    localStorage.setItem("bag", JSON.stringify(bag));
  } else {
    console.log("Livro não esta na sacola!");
  }
}

function logout() {
  window.location.href = "index.php";
  localStorage.removeItem("bag");
  localStorage.removeItem("user");
}

function openBag() {
  if (bag) {
    window.location.href = `bag.php`;
  } else {
    console.log("Sacola vazia");
  }
}
