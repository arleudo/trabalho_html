<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tabela de Livros</title>
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
          <th>Autor</th>
          <th>Sinopse</th>
          <th>Tema</th>
          <th>Alugado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Nome">It a Coisa</td>
          <td data-label="Autor">Stephen King</td>
          <td data-label="Sinopse">
            Na cidade de Darry um grupo de jovens luta ocntra um mal antigo
          </td>
          <td data-label="Tema">Terror</td>
          <td data-label="Alugado">
            <div class="sim"></div>
          </td>
        </tr>
        <tr>
          <td data-label="Nome">Conan o Bárbaro</td>
          <td data-label="Autor">Robert E. Howard</td>
          <td data-label="Sinopse">
            Um conto perdido do jovem Conan nas ruas de Síndar
          </td>
          <td data-label="Tema">Aventura</td>
          <td data-label="Alugado">
            <div class="nao"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <script src="../scripts/script.js"></script>
</body>
<footer>
  <button class="floattingButton">
    <img src="../imgs/plus.svg" alt="" height="25px" width="25px" />
  </button>
</footer>

</html>