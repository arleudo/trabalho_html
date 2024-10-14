let bag = [];
let badge = document.getElementById("badge");

document.addEventListener("DOMContentLoaded", function () {
  if (bag.length) {
    badge.style.visibility = "visible";
  } else {
    badge.style.visibility = "hidden";
  }
});

function addToBag(book_str) {
  book = JSON.parse(book_str);

  const exists = bag.find((b) => b.id == book.id);

  if (exists) {
    console.log("Livro ja esta na sacola!");
  } else {
    bag.push(book);
    badge.style.visibility = "visible";
    badge.innerText = bag.length;
  }
}

function logout() {
  window.location.href = "index.php";
}
