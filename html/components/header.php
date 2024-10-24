<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../css/header.css">
</head>
<header>
    <div class="header-container">
        <div>
            <div>
                <a href="../screens/main.php"><img src="../../imgs/logo.svg" alt="Book" class="logo"></a>
            </div>
        </div>
        <div>
            <nav class="nav-container">
                <ul class="nav-list">
                    <li><a href="../screens/users.php" id="usuarios-header">Usuários</a></li>
                    <li><a href="../screens/books.php" id="livros-header">Livros</a></li>
                    <li><a href="../screens/rent.php" id="alugar-header">Alugar</a></li>
                    <li><a href="../screens/back.php" id="devolver-header">Devolver</a></li>
                </ul>
            </nav>
        </div>
        <div class="last">
            <div class="iconbag">
                <img src="../../imgs/bag.svg" class="bag" onclick="openBag()">
                <div class="badge" id="div_badge">
                    <span id="badge"></span>
                </div>
            </div>
            <div>
                <img src="../../imgs/logout.png" class="logout" onclick="logout()">
            </div>
        </div>
    </div>
</header>
<script src="../../scripts/header.js"></script>

</html>