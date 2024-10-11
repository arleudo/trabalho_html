let users = [];
let editing = false;
let user_ = {};
let search = document.getElementById("search");

search.addEventListener("input", function () {
  if (search.value.length >= 3) {
    const searchValue = search.value.toLowerCase();
    const newUsers = users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchValue) ||
        u.cpf.toLowerCase().includes(searchValue)
    );
    updateTable(newUsers);
  } else {
    updateTable(users);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  loadUsers();
});

async function saveUser() {
  let name = document.getElementById("input_name").value;
  let email = document.getElementById("input_email").value;
  let cpf = document.getElementById("input_cpf").value;
  let phone = document.getElementById("input_phone").value;
  let user = {};

  if (!editing) {
    user = { id: users.length + 1, name, email, cpf, phone, active: 1 };
    const resp = await executePost("../actions/saveUser.php", user);
    if (resp) {
      users.push(user);
      updateTable(users);
    }
  } else {
    user_.name = name;
    user_.email = email;
    user_.cpf = cpf;
    user_.phone = phone;
    const resp = await executePost("../actions/updateUser.php", user_);
    if (resp) {
      updateTable(users);
    }
  }

  closeDialog();
  cleanUserDialog();
}

function updateTable(array) {
  const tableBody = document.getElementById("table_users");
  tableBody.innerHTML = "";

  array.forEach((user) => {
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
          <div class="button-rent" onclick="goToRent(${user.id})">
            <img src="../../imgs/bag.svg">
          </div>
        </div
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function loadUsers() {
  fetch("../actions/loadUsers.php")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      updateTable(users);
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
  editing = false;
}

function rentBook(id) {
  openDialogRent(id);
}

function goToRent(id) {
  closeDialogRent();
  window.location.href = "rent.php?id=" + id;
}

function editUser(id) {
  user_ = users.find((u) => u.id == id);
  if (user_) {
    document.getElementById("input_name").value = user_.name;
    document.getElementById("input_email").value = user_.email;
    document.getElementById("input_cpf").value = user_.cpf;
    document.getElementById("input_phone").value = user_.phone;
    editing = true;
    search.value = "";
    openDialog();
  }
}

async function deleteUser(id) {
  const resp = await executePost("../actions/deleteUser.php", { id });
  if (resp) {
    users = users.filter((user) => user.id != id);
    updateTable();
  } else {
    console.log("Erro ao deletar usuário");
  }
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

function openDialogRent(id) {
  document.getElementById("dialogRent").style.display = "flex";
  console.log(id);
}

function closeDialogRent() {
  document.getElementById("dialogRent").style.display = "none";
}
