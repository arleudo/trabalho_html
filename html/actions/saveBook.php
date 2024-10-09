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
    $author = $data['author'];
    $sinopse = $data['sinopse'];
    $theme = $data['theme'];
    $url = $data['url'];
    $rent = $data['rent'];

    // Prepara a consulta SQL
    $stmt = $pdo->prepare("INSERT INTO book (id, name, author, sinopse, theme, url, rent ) VALUES (:id, :name, :author, :sinopse, :theme, :url, :rent)");

    // Liga os parâmetros
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':author', $author);
    $stmt->bindParam(':sinopse', $sinopse);
    $stmt->bindParam(':theme', $theme);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':rent', $rent);

    // Executa a consulta
    $stmt->execute();

    echo json_encode(["message" => "Livro cadastrado com sucesso!"]);


} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
}

// Fecha a conexão
$pdo = null;