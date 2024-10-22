// função de inicialização da pagina
document.addEventListener("DOMContentLoaded", function () {
  loadUsers();
});

// carrega os usuários do banco
async function loadUsers() {
  users = await (await fetch("../actions/loadUsers.php")).json();
}

// função generica pra abrir um dialog
function openDialog() {
  document.getElementById("dialog").style.display = "flex";
}

// função generica pra fechar um dialog
function closeDialog() {
  document.getElementById("dialog").style.display = "none";
}

// valida o input pra impedir de digitar letras no campo
// essa função é usada nos campos de telefone e cpf
function validarInput(input) {
  input.value = input.value.replace(/[^0-9.]/g, "");

  if (input.value.length > 11) {
    input.value = input.value.slice(0, 11);
  }
}

// função que valida o login
function validLogin() {
  // pegando os campos
  const emailField = document.getElementById("field_email");
  const passwordField = document.getElementById("field_password");

  // aplicando uma validação de campos vazios
  if (emailField.value === "" || passwordField.value === "") {
    const campoVazio = emailField.value === "" ? "E-mail" : "Senha";
    emailField.setCustomValidity(`Campo ${campoVazio} é obrigatório.`);
    emailField.reportValidity();
    return;
  }

  // verificando se encontra na lista d usuários
  const found = users.find(
    (u) => u.email === emailField.value && u.password === passwordField.value
  );

  // verificando se é o usuário administrador do sistema
  const isAdmin =
    emailField.value === "admin@admin.com" && passwordField.value === "admin";

  // se encontrou um usuário ou se é admin, permite avançar no sistema
  if (found || isAdmin) {
    showToast("Login realizado com sucesso!!");
    setTimeout(() => {
      const userData = found
        ? found
        : { name: "admin", email: emailField.value };
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "main.php";
    }, 1000);
  } else {
    emailField.setCustomValidity(
      "Credenciais de login inválidas. Verifique o e-mail ou a senha."
    );
    emailField.reportValidity();
  }
}

function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
