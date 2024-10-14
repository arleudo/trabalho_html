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
  `cpf` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

$sql2 = "CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `sinopse` varchar(45) DEFAULT NULL,
  `theme` varchar(45) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `rent` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

$sql3 = "CREATE TABLE `rent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NULL,
  `id_book` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_user`
    FOREIGN KEY (`id`)
    REFERENCES `trabalho_html`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_book`
    FOREIGN KEY (`id`)
    REFERENCES `trabalho_html`.`book` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION 
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";


$conn->query($sql1);
$conn->query($sql2);
$conn->query($sql3);

$conn->close();