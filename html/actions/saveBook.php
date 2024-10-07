<?php
$file = '../../data/books.json';
$data = file_get_contents("php://input");

$book = json_decode($data, true);

if ($book && isset($book['name'], $book['author'], $book['sinopse'], $book['rent'])) {
    if (file_exists($file)) {
        $currentData = json_decode(file_get_contents($file), associative: true);
        if (!is_array($currentData)) {
            $currentData = [];
        }
    } else {
        $currentData = [];
    }

    $currentData[] = $book;

    if (file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true, "message" => "Livro salvo com sucesso."]);
    } else {
        echo json_encode(["success" => false, "error" => "Erro ao salvar o livro."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Dados inválidos."]);
}
