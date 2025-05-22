<?php

require_once 'config.php';

$originDomain = 'http://localhost:5173';
header("Access-Control-Allow-Origin: $originDomain");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

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
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'Username and password are required.']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT username, password FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    $user = $stmt->fetch();

    if ($user && strcmp($user['password'], $password) === 0) {
        $_SESSION['username'] = $user['username'];
        $_SESSION['logged_in'] = true;

        http_response_code(200); // OK
        echo json_encode([
            'username' => $user['username'],
            'success' => true
        ]);
    } else {
        http_response_code(401); // Unauthorized
        echo json_encode([
            'username' => null,
            'success' => false,
            'message' => 'Invalid username or password.']);
    }

} catch (PDOException $e) {
    error_log('Login query error: ' . $e->getMessage());
    http_response_code(500); // Internal Server Error
    echo json_encode(['message' => 'An error occurred during login. Please try again.']);
}


