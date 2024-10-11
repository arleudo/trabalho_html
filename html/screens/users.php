<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tabela de Usuários</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../css/index.css" />
  <link rel="stylesheet" href="../../css/users.css" />
</head>
<?php include '../components/header.php'; ?>

<body>
  <div class="user-container">
    <div class="topo">
      <div class="search-container">
        <input placeholder="Buscar pelo nome ou CPF" id="search" class="search">
        </input>
        <div class="lupa">
          <img src="../../imgs/search.svg" alt="">
          </img>
        </div>
      </div>
      <div class="floattingButton" onclick="openDialog()">
        <img src="../../imgs/plus.svg" alt="" />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="table_users">
        </tbody>
      </table>
    </div>
  </div>


  <?php include '../components/dialogUser.php'; ?>

  <script src="../../scripts/script.js"></script>
  <script src="../../scripts/users.js"></script>
</body>

</html>