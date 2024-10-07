<?php
$file = '../../data/books.json';

if (file_exists($file)) {
    $data = file_get_contents($file);
    echo $data;
} else {
    echo json_encode([]);
}
