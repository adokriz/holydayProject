<?php

require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'Invalid JSON input.']);
    exit();
}

$username = $data['username'] ?? '';
$allDataFlag = $data['allData'] ?? '';

if (empty($username)) {
    http_response_code(400);
    echo json_encode(['message' => 'Username is required.']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch();

    if ($user > 0) {
        http_response_code(200);
        if ($allDataFlag){
            echo json_encode([
            'username' => $user['username'],
            'img' => $user['img']
            ]);
        }
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'User not found.']);
    }
} catch (PDOException $e) {
    error_log('User query error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['message' => 'An error occurred while querying the database.']);
}

