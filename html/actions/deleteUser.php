<?php
$host = 'localhost';
$dbname = 'database';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'];
    $stmt = $pdo->prepare("DELETE FROM user WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    echo json_encode(["message" => "Usuário deletado com sucesso!"]);

} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
}

$pdo = null;