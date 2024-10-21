let users = [];
let editing = false;
let user_ = {};
let search = document.getElementById("search");

// função de carregamento da pagina
document.addEventListener("DOMContentLoaded", function () {
  loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email != "admin@admin.com") {
    window.location.href = "main.php";
  }
  // carregando os usuários do banco
  loadUsers();
});

// pegando o campo de busca
search.addEventListener("input", function () {
  // so faz alguma coisa a partir da 3 ª letra
  if (search.value.length >= 3) {
    // colocando tudo em minusculo pra facilitar as comparações
    const searchValue = search.value.toLowerCase();
    const newUsers = users.filter(
      (u) =>
        // filtrando com base no nome e no cpf
        u.name.toLowerCase().includes(searchValue) ||
        u.cpf.toLowerCase().includes(searchValue)
    );
    // atualiza a tela com os usuarios filtrados
    updateTable(newUsers);
  } else {
    // atualiza a tela com os usuários carregados do banco
    updateTable(users);
  }
});

// salva um usuário no banco
async function saveUser() {
  // pegando os campos preenchido
  let name = document.getElementById("input_name");
  let email = document.getElementById("input_email");
  let password = document.getElementById("input_password");
  let cpf = document.getElementById("input_cpf");
  let phone = document.getElementById("input_phone");
  let user = {};

  // aplicando validação de campos vazios
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

  // aplicando a validação de cpf
  if (!validarCPF(cpf.value)) {
    cpf.setCustomValidity("CPF Inválido");
    cpf.reportValidity();
    return;
  }

  // verificando de esta editando ou criando um novo usuário
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
    // criando um novo usuário no banco
    const resp = await executePost("../actions/saveUser.php", user);
    if (resp) {
      // atualizando a tela com o novo usuario criado
      users.push(user);
      updateTable(users);
    }
  } else {
    user_.name = name.value;
    user_.email = email.value;
    user_.password = password.value;
    user_.cpf = cpf.value;
    user_.phone = phone;
    // atualizando o usuário
    const resp = await executePost("../actions/updateUser.php", user_);
    if (resp) {
      // atualizando a tela com o usuário alterado
      updateTable(users);
    }
  }

  // fechando o dialog e limpando os campos
  closeDialog();
  cleanUserDialog();
}

// atualizando a tela com base no array de usuarios
function updateTable(array) {
  const tableBody = document.getElementById("table_users");
  tableBody.innerHTML = "";

  // varrendo o array de usuários, pra cada usuário uma nova linha sera inserida na tabela
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

// carrega os usuários do banco de dados
async function loadUsers() {
  fetch("../actions/loadUsers.php")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      // insere os usuários na tabela
      updateTable(users);
    })
    .catch((error) => {
      console.error("Erro ao carregar os usuários:", error);
    });
}

// limpando os campos
function cleanUserDialog() {
  document.getElementById("input_name").value = "";
  document.getElementById("input_email").value = "";
  document.getElementById("input_password").value = "";
  document.getElementById("input_cpf").value = "";
  document.getElementById("input_phone").value = "";
  editing = false;
}

// editando o usuário selecionado
function editUser(id) {
  user_ = users.find((u) => u.id == id);
  if (user_) {
    // preenchendo os campos
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

// função que remove um usuário no banco de dados
async function deleteUser(id) {
  // removendo o usuário
  const resp = await executePost("../actions/deleteUser.php", { id });
  if (resp) {
    // atualizado a tela pra nao msotrar mais o usuario removido
    users = users.filter((user) => user.id != id);
    updateTable(users);
  } else {
    console.log("Erro ao deletar usuário");
  }
}

// função que acessa o banco de dados
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

// funçao que valida um cpf com base no algoritmo nacional do resto de 11
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
