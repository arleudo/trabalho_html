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
    $name = $data['name'];
    $author = $data['author'];
    $sinopse = $data['sinopse'];
    $theme = $data['theme'];
    $url = $data['url'];
    $rent = $data['rent'];

    $stmt = $pdo->prepare("INSERT INTO book (id, name, author, sinopse, theme, url, rent ) VALUES (:id, :name, :author, :sinopse, :theme, :url, :rent)");

    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':author', $author);
    $stmt->bindParam(':sinopse', $sinopse);
    $stmt->bindParam(':theme', $theme);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':rent', $rent);

    $stmt->execute();

    echo json_encode(["message" => "Livro cadastrado com sucesso!"]);


} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
}
$pdo = null;