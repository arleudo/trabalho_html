<?php
$host = 'localhost';
$dbname = 'trabalho_html';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare("SELECT id, id_user, id_book, comment, stars FROM recomendations");

    $stmt->execute();
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($comments);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
$pdo = null;
