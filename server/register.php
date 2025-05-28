<?php

require_once 'config.php';
require_once 'ApiHandler.php';
require_once 'utils.php';

$api = new ApiHandler($pdo);
$api->handleOptions();

$data = $api->getJsonInput();
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';

function validateInput($username, $password, $confirmPassword) {
    $errors = [];

    if (empty($username)) {
        $errors[] = 'Username is required.';
    } elseif (strlen($username) < 4) {
        $errors[] = 'Username must be at least 4 characters long.';
    } elseif (strlen($username) > 50) {
        $errors[] = 'Username must be less than 50 characters.';
    } elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
        $errors[] = 'Username can only contain letters, numbers, and underscores.';
    }

    if (empty($password)) {
        $errors[] = 'Password is required.';
    } elseif (strlen($password) < 4) {
        $errors[] = 'Password must be at least 4 characters long.';
    }

    if ($password !== $confirmPassword) {
        $errors[] = 'Passwords do not match.';
    }

    return $errors;
}

$validationErrors = validateInput($username, $password, $confirmPassword);

if (!empty($validationErrors)) {
    $api->sendError(400, implode(' ', $validationErrors));
}

try {
    $existsError = checkUserExists($pdo, $username);

    if ($existsError) {
            $api->sendError(409, $existsError);
        }

    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);

    if ($stmt->execute()){
        $api->sendSuccess(['registration' => 'success']);
    }else {
        $api->sendError(500, 'Failed to create user account.');
    }
} catch (PDOException $e) {
      $api->handleDatabaseError($e);
}