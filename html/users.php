<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tabela de Usuários</title>
  <link rel="stylesheet" href="../css/index.css" />
  <link rel="stylesheet" href="../css/users.css" />
  <link rel="stylesheet" href="../css/header.css" />
</head>
<?php include 'header.php'; ?>

<body>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Ativo</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  </div>
  <script src="../scripts/script.js"></script>

  <div id="dialog" class="dialog-overlay">
    <div class="dialog-box">
      <h2>Novo Usuário</h2>
      <form id="addUserForm">
        <input type="text" id="input_name" name="nome" required placeholder="Nome" />
        <input type="email" id="input_email" name="email" required placeholder="Email" />
        <input type="text" id="input_cpf" name="cpf" required placeholder="CPF" />
        <input type="tel" id="input_phone" name="telefone" required placeholder="Telefone" />

        <button type="button" onclick="saveUser()">Salvar</button>
      </form>
    </div>
  </div>
</body>
<footer>
  <button class="floattingButton" onclick="openDialog()">
    <img src="../imgs/plus.svg" alt="" height="25px" width="25px" />
  </button>
</footer>

</html>