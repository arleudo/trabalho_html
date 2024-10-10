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
    $name = $data['name'];
    $author = $data['author'];
    $sinopse = $data['sinopse'];
    $theme = $data['theme'];
    $url = $data['url'];
    $rent = $data['rent'];

    $stmt = $pdo->prepare("UPDATE book SET name = :name, author = :author, sinopse = :sinopse, theme = :theme, url = :url, rent = :rent  WHERE id = :id");

    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':author', $author);
    $stmt->bindParam(':sinopse', $sinopse);
    $stmt->bindParam(':theme', $theme);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':rent', $rent);

    $stmt->execute();

    if ($stmt->rowCount()) {
        echo json_encode(["message" => "Livro atualizado com sucesso!"]);
    } else {
        echo json_encode(["message" => "Nenhum dado foi atualizado. Verifique o ID."]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
}

$pdo = null;