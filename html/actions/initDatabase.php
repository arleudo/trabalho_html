<?php
$host = "localhost";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password);

if ($conn->connect_error) {
  die("Falha na conexão: " . $conn->connect_error);
}

$databaseName = "trabalho_html";

$sqlCreateDB = "CREATE DATABASE IF NOT EXISTS $databaseName";

if ($conn->query($sqlCreateDB) === FALSE) {
  echo "Erro ao criar o banco de dados: " . $conn->error . "<br>";
}

$conn->select_db($databaseName);

$sql1 = "CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

$sql2 = "CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `sinopse` varchar(250) DEFAULT NULL,
  `theme` varchar(45) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `rent` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

$sql3 = "CREATE TABLE `rent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_book` int(11) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

$sql4 = "CREATE TABLE `recomendations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_book` int(11) DEFAULT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `stars` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";


$conn->query($sql1);
$conn->query($sql2);
$conn->query($sql3);
$conn->query($sql4);

$conn->close();