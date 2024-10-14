let bag = [];

function addToBag(book_str) {
  book = JSON.parse(book_str);

  const exists = bag.find((b) => b.id == book.id);

  if (exists) {
    console.log("Livro ja esta na sacola!");
  } else {
    bag.push(book);
    console.log("Livro " + book_str + " adicionado a sacola");
  }
}

function logout() {
  window.location.href = "index.php";
}
