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
    $email = $data['email'];
    $cpf = $data['cpf'];
    $phone = $data['phone'];
    $active = $data['active'];

    $stmt = $pdo->prepare("UPDATE user SET name = :name, email = :email, cpf = :cpf, phone = :phone, active = :active WHERE id = :id");

    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':cpf', $cpf);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':active', $active);

    $stmt->execute();

    if ($stmt->rowCount()) {
        echo json_encode(["message" => "Usuário atualizado com sucesso!"]);
    } else {
        echo json_encode(["message" => "Nenhum dado foi atualizado. Verifique o ID."]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
}
$pdo = null;