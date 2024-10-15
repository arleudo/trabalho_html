<?php
$host = 'localhost';
$dbname = 'trabalho_html';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare("SELECT id, id_user, id_book FROM rent");

    $stmt->execute();
    $rents = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rents);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
$pdo = null;
