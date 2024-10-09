<?php
// Configurações do banco de dados
$host = 'localhost'; // Endereço do servidor MySQL
$dbname = 'database'; // Nome do banco de dados
$username = 'root'; // Usuário do banco de dados
$password = 'admin'; // Senha do banco de dados

try {
    // Conecta ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Define o modo de erro do PDO para exceções
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verifica se o formulário foi enviado
    $data = json_decode(file_get_contents("php://input"), true);

    // Obtém os dados do objeto decodificado
    $id = $data['id'];
    $name = $data['name'];
    $email = $data['email'];
    $cpf = $data['cpf'];
    $phone = $data['phone'];
    $active = $data['active'];

    // Prepara a consulta SQL
    $stmt = $pdo->prepare("INSERT INTO user (id, name, email, cpf, phone, active ) VALUES (:id, :name, :email, :cpf, :phone, :active)");

    // Liga os parâmetros
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':cpf', $cpf);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':active', $active);

    // Executa a consulta
    $stmt->execute();

    echo json_encode(["message" => "Usuário cadastrado com sucesso!"]);


} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
}

// Fecha a conexão
$pdo = null;