<?php

class ApiHandler {
    protected $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
        $this->setHeaders();
        session_start();
    }

    private function setHeaders() {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: http://localhost:5173');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
    }

    public function handleOptions() {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    public function getJsonInput() {
            $input = file_get_contents('php://input');
            $data = json_decode($input, true);

            if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
                $this->sendError(400, 'Invalid JSON input.');
            }

            return $data;
        }

     public function validateUsername($username) {
            if (empty($username)) {
                $this->sendError(400, 'Username is required.');
            }
        }

    public function sendSuccess($data) {
            http_response_code(200);
            echo json_encode($data);
            exit();
        }

    public function sendError($code, $message) {
            http_response_code($code);
            echo json_encode(['message' => $message]);
            exit();
        }

        public function handleDatabaseError($e) {
            error_log('Database query error: ' . $e->getMessage());
            $this->sendError(500, 'An error occurred while querying the database.');
        }
    }