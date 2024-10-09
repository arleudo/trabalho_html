let users = [];

document.addEventListener("DOMContentLoaded", function () {
  loadUsers();
});

function saveUser() {
  let name = document.getElementById("input_name").value;
  let email = document.getElementById("input_email").value;
  let cpf = document.getElementById("input_cpf").value;
  let phone = document.getElementById("input_phone").value;
  let user = { id: users.length + 1, name, email, cpf, phone, active: 1 };

  fetch("../actions/saveUser.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Mudei para application/json
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json()) // Converte a resposta para JSON
    .then((data) => {
      users.push(user);
      updateTable();
      console.log(data);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });

  closeDialog();
  cleanUserDialog();
}

function updateTable() {
  const tableBody = document.getElementById("table_users");
  tableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Nome">${user.name}</td>
      <td data-label="Email">${user.email}</td>
      <td data-label="CPF">${user.cpf}</td>
      <td data-label="Telefone">${user.phone}</td>
      <td data-label="Ativo"><div class="${
        user.active ? "sim" : "nao"
      }"></div></td>
      <td data-label="Ações">
      <div class="actions">
        <div class="button-rent" onclick="editUser(${user.id})">
          <img src="../../imgs/pencil.svg">
        </div>
        <div class="button-rent" onclick="deleteUser(${user.id})">
          <img src="../../imgs/trash.svg">
        </div>  
        <div class="button-rent" onclick="rentBook(${user.id})">
          <img src="../../imgs/bag.svg">
        </div>
      </div
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function loadUsers() {
  fetch("../actions/loadUsers.php")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      updateTable();
    })
    .catch((error) => {
      console.error("Erro ao carregar os usuários:", error);
    });
}

function cleanUserDialog() {
  document.getElementById("input_name").value = "";
  document.getElementById("input_email").value = "";
  document.getElementById("input_cpf").value = "";
  document.getElementById("input_phone").value = "";
}

function rentBook(id) {
  console.log("Alugando livro para  o usuario: " + id);
}

function editUser(id) {
  console.log("Editando o usuario: " + id);
}

function deleteUser(id) {
  console.log("Deletando o usuario: " + id);
}
