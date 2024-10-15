let user = {};
let users = [];
let books = [];
let bag_books = [];
let rents = [];

document.addEventListener("DOMContentLoaded", async function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idUser = urlParams.get("id_user");
  const idBook = urlParams.get("id_book");

  await loadUser(idUser);
  await loadBooks();
  await loadRents();
  await loadBook(idBook);

  const rentContainer = document.getElementById("bag-container");
  rentContainer.innerHTML = "";

  bag_books.forEach((book) => {
    addToBag(JSON.stringify(book));
    if (book.rent) {
      const card = document.createElement("div");
      card.classList.add("card-book");

      card.innerHTML = `
      <img src="${book.url}" width="80px" height="80px">
      <div class="card-content">
          <p>${book.name}</p>
      </div>
      <button onclick="remove(${book.id})">Remover</button>
    `;
      rentContainer.appendChild(card);
    }
  });
});

function remove(id) {
  removeFromBag(id);
}

async function loadUser(id) {
  await loadUsers();
  user = users.find((u) => u.id == id);
}

async function loadBook(array) {
  await loadBooks();
  const idBookArray = array ? array.split(",").map(String) : [];
  bag_books = books.filter((book) => idBookArray.includes(book.id));
}

async function loadUsers() {
  users = await (await fetch("../actions/loadUsers.php")).json();
}

async function loadBooks() {
  books = await (await fetch("../actions/loadBooks.php")).json();
}

async function loadRents() {
  rents = await (await fetch("../actions/loadRents.php")).json();
}

async function confirmRent() {
  console.log("rents antes de iniciar o for", rents);
  for (let index = 0; index < bag_books.length; index++) {
    const element = bag_books[index];
    const rent = {
      id: rents.length + 1,
      id_user: user.id,
      id_book: element.id,
    };
    element.rent = false;
    await executePost("../actions/updateBook.php", element);
    const resp = await executePost("../actions/saveRent.php", rent);

    if (resp) {
      rents.push(rent);
    } else {
      console.log("erro");
    }
  }
  console.log("Aluguel confirmado");
  window.location.href = "main.php";
}

async function executePost(action, data) {
  const resp = await fetch(action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return resp.json();
}
