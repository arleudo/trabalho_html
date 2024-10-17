<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tela Principal</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="../../css/index.css" />
  <link rel="stylesheet" href="../../css/main.css" />
</head>
<?php include '../components/header.php'; ?>
<?php include '../components/userInfo.php'; ?>

<body>
  <div class="main-container">
    <a href="./users.php" id="usuarios">
      <div class="card">
        <img src="../../imgs/user.png" alt="" />
        <span>Usuários</span>
      </div>
    </a>
    <a href="./books.php" id="livros">
      <div class="card">
        <img src="../../imgs/logo.svg" alt="" />
        <span>Livros</span>
      </div>
    </a>
    <a href="./rent.php" id="alugar">
      <div class="card">
        <img src="../../imgs/rent.png" alt="" />
        <span>Alugar</span>
      </div>
    </a>
    <a href="./back.php" id="devolver">
      <div class="card">
        <img src="../../imgs/back.png" alt="" />
        <span>Devolver</span>
      </div>
    </a>
  </div>
  <script src="../../scripts/script.js"></script>
  <script src="../../scripts/main.js"></script>
</body>

</html>