let bag = [];
let badge = document.getElementById("badge");
let div_badge = document.getElementById("div_badge");

document.addEventListener("DOMContentLoaded", function () {
  if (bag.length) {
    div_badge.style.visibility = "visible";
  } else {
    div_badge.style.visibility = "hidden";
  }
});

function addToBag(book_str) {
  book = JSON.parse(book_str);

  const exists = bag.find((b) => b.id == book.id);

  if (exists) {
    console.log("Livro ja esta na sacola!");
  } else {
    bag.push(book);
    div_badge.style.visibility = "visible";
    badge.innerText = bag.length;
  }
}

function logout() {
  window.location.href = "index.php";
}
