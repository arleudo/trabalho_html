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
                    <li><a href="../screens/users.php">Usuários</a></li>
                    <li><a href="../screens/books.php">Livros</a></li>
                    <li><a href="../screens/rent.php">Alugar</a></li>
                    <li><a href="../screens/rent.php">Devolver</a></li>
                </ul>
            </nav>
        </div>
        <div class="last">
            <div>
                <div class="badge" id="badge">
                </div>
                <img src="../../imgs/bag.svg" class="bag" onclick="logout()">
            </div>
            <div>
                <img src="../../imgs/logout.png" class="logout" onclick="logout()">
            </div>
        </div>
    </div>
</header>
<script src="../../scripts/header.js"></script>

</html>