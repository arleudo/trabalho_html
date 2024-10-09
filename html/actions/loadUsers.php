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

    // Prepara a consulta SQL para selecionar todos os usuários
    $stmt = $pdo->prepare("SELECT id, name, email, cpf, phone, active FROM user");

    // Executa a consulta
    $stmt->execute();

    // Busca todos os resultados
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna os resultados como um JSON
    echo json_encode($users);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

// Fecha a conexão
$pdo = null;
