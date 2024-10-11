<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alugar</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../css/index.css" />
    <link rel="stylesheet" href="../../css/rent.css" />
</head>
<?php include '../components/header.php'; ?>

<body>
    <div class="rent-page-container">
        <div class="topoRent">
            <div class="search-container">
                <input placeholder="Buscar pelo nome ou CPF" id="searchRent" class="search">
                </input>
                <div class="lupa">
                    <img src="../../imgs/search.svg" alt="">
                    </img>
                </div>
            </div>
            <input id="chosenSelect" class="inputDisable">
            </input>
        </div>
        <div class="rent-container">
        </div>
    </div>
    <?php include '../components/dialogRent.php'; ?>
    <script src="../../scripts/rent.js"></script>
</body>

</html>