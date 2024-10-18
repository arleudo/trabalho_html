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
  loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email != "admin@admin.com") {
    window.location.href = "main.php";
  }
  loadUsers();
});

async function saveUser() {
  let name = document.getElementById("input_name");
  let email = document.getElementById("input_email");
  let password = document.getElementById("input_password");
  let cpf = document.getElementById("input_cpf");
  let phone = document.getElementById("input_phone");
  let user = {};

  

  if (name.value == "") {
    name.setCustomValidity("Campo obrigatório.");
    name.reportValidity();
    return;
  }

  if (email.value == "") {
    email.setCustomValidity("Campo obrigatório.");
    email.reportValidity();
    return;
  }

  if (password.value == "") {
    password.setCustomValidity("Campo obrigatório.");
    password.reportValidity();
    return;
  }

  if (!validarCPF(cpf.value)) {
    cpf.setCustomValidity("CPF Inválido");
    cpf.reportValidity();
    return;
  }

  if (!editing) {
    user = {
      id: users.length + 1,
      name: name.value,
      email: email.value,
      password: password.value,
      cpf: cpf.value,
      phone: phone.value,
      active: 1,
    };
    const resp = await executePost("../actions/saveUser.php", user);
    if (resp) {
      users.push(user);
      updateTable(users);
    }
  } else {
    user_.name = name.value;
    user_.email = email.value;
    user_.password = password.value;
    user_.cpf = cpf.value;
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
  document.getElementById("input_password").value = "";
  document.getElementById("input_cpf").value = "";
  document.getElementById("input_phone").value = "";
  editing = false;
}

function goToRent(id) {
  window.location.href = "rent.php?id=" + id;
}

function editUser(id) {
  user_ = users.find((u) => u.id == id);
  if (user_) {
    document.getElementById("input_name").value = user_.name;
    document.getElementById("input_email").value = user_.email;
    document.getElementById("input_password").value = user_.password;
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
    updateTable(users);
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

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma;
  let resto;

  soma = 0;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}
