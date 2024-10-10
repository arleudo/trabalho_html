function openDialog() {
  document.getElementById("dialog").style.display = "flex";
}

function closeDialog() {
  document.getElementById("dialog").style.display = "none";
}

function validLogin() {
  let email = document.getElementById("field_email").value;
  let password = document.getElementById("field_password").value;

  if (email === "admin@admin.com" && password === "admin") {
    window.location.href = "main.php";
  } else {
    console.log("Erro nas credenciais de login");
  }
}

async function POST(action, data) {
  const resp = await fetch(action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return resp.json();
}
