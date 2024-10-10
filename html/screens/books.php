<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tabela de Livros</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../css/index.css" />
  <link rel="stylesheet" href="../../css/users.css" />
</head>
<?php include '../components/header.php'; ?>

<body>
  <div class="user-container">
    <div class="search-container">
      <input placeholder="Buscar" id="searchBook" class="search">
      <div class="lupa">
        <img src="../../imgs/search.svg" alt="">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Autor</th>
            <th>Sinopse</th>
            <th>Tema</th>
            <th>Disponível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="table_books">
        </tbody>
      </table>
    </div>
  </div>

  <?php include '../components/dialogBook.php'; ?>

  <script src="../../scripts/script.js"></script>
  <script src="../../scripts/books.js"></script>
</body>
<?php include '../components/footer.php'; ?>

</html>