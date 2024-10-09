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

    // Recebe os dados da requisição
    $data = json_decode(file_get_contents("php://input"), true);

    // Obtém os dados do objeto decodificado
    $id = $data['id'];
    $name = $data['name'];
    $email = $data['email'];
    $cpf = $data['cpf'];
    $phone = $data['phone'];
    $active = $data['active'];

    // Prepara a consulta SQL para atualizar os dados do usuário
    $stmt = $pdo->prepare("UPDATE user SET name = :name, email = :email, cpf = :cpf, phone = :phone, active = :active WHERE id = :id");

    // Liga os parâmetros
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':cpf', $cpf);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':active', $active);

    // Executa a consulta
    $stmt->execute();

    // Verifica se alguma linha foi afetada
    if ($stmt->rowCount()) {
        echo json_encode(["message" => "Usuário atualizado com sucesso!"]);
    } else {
        echo json_encode(["message" => "Nenhum dado foi atualizado. Verifique o ID."]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
}

// Fecha a conexão
$pdo = null;