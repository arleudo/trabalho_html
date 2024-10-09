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
        <img src="../../imgs/logo.svg" alt="Book" class="logo">
        <img src="../../imgs/logout.png" class="logout" onclick="logout()">
        <img src="../../imgs/bag.svg" class="bag" onclick="logout()">

        <nav class="nav-container">
            <ul class="nav-list">
                <li><a href="../screens/main.php">Home</a></li>
                <li><a href="../screens/users.php">Usuários</a></li>
                <li><a href="../screens/books.php">Livros</a></li>
                <li><a href="../screens/rent.php">Alugar</a></li>
                <li>Devolver</li>
            </ul>
        </nav>
        <div class="menu-container">
            <span class="menu-toggle">&#9776;</span>
        </div>
    </div>
</header>
<script src="../../scripts/header.js"></script>

</html>