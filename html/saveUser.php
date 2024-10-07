<?php
// Caminho para o arquivo JSON onde os usuários serão armazenados
$file = '../data/users.json';

// Lê o corpo da requisição
$data = file_get_contents("php://input");

// Decodifica os dados JSON enviados
$user = json_decode($data, true);

// Verifica se os dados do usuário foram enviados corretamente
if ($user && isset($user['name'], $user['email'], $user['cpf'], $user['phone'])) {
    // Verifica se o arquivo JSON já existe
    if (file_exists($file)) {
        // Carrega o conteúdo atual do arquivo JSON
        $currentData = json_decode(file_get_contents($file), true);
        if (!is_array($currentData)) {
            $currentData = [];
        }
    } else {
        $currentData = [];
    }

    // Adiciona o novo usuário ao array
    $currentData[] = $user;

    // Salva o array atualizado de volta no arquivo JSON
    if (file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT))) {
        // Retorna uma resposta de sucesso
        echo json_encode(["success" => true, "message" => "Usuário salvo com sucesso."]);
    } else {
        // Retorna uma resposta de erro se não conseguiu salvar
        echo json_encode(["success" => false, "error" => "Erro ao salvar o usuário."]);
    }
} else {
    // Retorna uma resposta de erro se os dados estiverem incompletos
    echo json_encode(["success" => false, "error" => "Dados inválidos."]);
}
