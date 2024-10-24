<?php
$host = 'localhost';
$dbname = 'trabalho_html';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'];
    $id_user = $data['id_user'];
    $id_book = $data['id_book'];

    $stmt = $pdo->prepare("INSERT INTO rent (id, id_user, id_book) VALUES (:id, :id_user, :id_book)");

    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':id_user', $id_user);
    $stmt->bindParam(':id_book', $id_book);

    $stmt->execute();

    echo json_encode(["message" => "Aluguel realizado com sucesso!"]);


} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
}
$pdo = null;