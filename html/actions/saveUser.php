<?php
$file = '../../data/users.json';

$data = file_get_contents("php://input");
$user = json_decode($data, true);

if ($user && isset($user['name'], $user['email'], $user['cpf'], $user['phone'])) {
    if (file_exists($file)) {
        $currentData = json_decode(file_get_contents($file), true);
        if (!is_array($currentData)) {
            $currentData = [];
        }
    } else {
        $currentData = [];
    }

    $currentData[] = $user;

    if (file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true, "message" => "Usuário salvo com sucesso."]);
    } else {
        echo json_encode(["success" => false, "error" => "Erro ao salvar o usuário."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Dados inválidos."]);
}
