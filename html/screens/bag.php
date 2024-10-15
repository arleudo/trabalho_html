<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alugar</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../css/index.css" />
    <link rel="stylesheet" href="../../css/bag.css" />
</head>
<?php include '../components/header.php'; ?>

<body>
    <div class="main-bag-container">
        <div class="bag-container" id="bag-container">
        </div>
        <div class="bag-container-confirm">

            <p>Após verificar a lista de livros, <br>clique no botão abaixo para confirmar</p>
            <button onclick="confirmRent()">Confirmar</button>
        </div>
    </div>
    <script src="../../scripts/bag.js"></script>
</body>

</html>