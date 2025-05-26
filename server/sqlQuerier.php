<?php
require_once 'config.php';
require_once 'ApiHandler.php';

$api = new ApiHandler($pdo);
$api->handleOptions();

$data = $api->getJsonInput();
$username = $data['username'] ?? '';
$allDataFlag = $data['allData'] ?? false;
$api->validateUsername($username);

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if ($allDataFlag) {
            $api->sendSuccess([
                'username' => $user['username'],
                'img' => $user['img']
            ]);
        } else {
            $api->sendSuccess($user);
        }
    } else {
        $api->sendError(404, 'User not found.');
    }
} catch (PDOException $e) {
    $api->handleDatabaseError($e);
}