<?php

function read_file($filename) {
    if (!file_exists($filename)) return [];
    $data = file($filename);
    return array_map(function($line) {
        return unserialize($line);
    }, $data);
}

function write_file($filename, $data) {
    $data = array_map(function($item) {
        return serialize($item);
    }, $data);

    file_put_contents($filename, implode(PHP_EOL, $data));
}

function getApp($clientId) {
    $apps = read_file('./data/app.data');
    foreach($apps as $app) {
        if($app['client_id'] === $clientId) {
            return $app;
        }
    }

    return false;
}

function getCode($clientId, $code) {
    $codes = read_file('./data/code.data');
    foreach($codes as $codeLine) {
        if($codeLine['client_id'] === $clientId && $codeLine['code'] === $code) {
            return $codeLine;
        }
    }

    return false;
}

function askAuthorization() {
    $clientId = $_GET['client_id'];
    $app = getApp($clientId);

    if($app) {
        $redirectSuccess = "/auth-success?state={$_GET['state']}&client_id={$_GET['client_id']}";
        $redirectError = "/auth-error?state={$_GET['state']}";

        echo "<h3>{$app['name']}</h3>";
        echo "<a href='{$redirectSuccess}'>Accept</a>";
        echo "<a href='{$redirectError}'>Refuse</a>";
    }
}

function askAuthorizationSuccess() {
    $clientId = $_GET['client_id'];
    $app = getApp($clientId);
    if ($app) {
        $code = uniqid();
        $redirect = $app['redirect_uri_success'];
        $redirect .= "?code={$code}&state={$_GET['state']}";

        $codes = read_file('./data/code.data');
        $codes[] = ['client_id'=> $clientId, 'code' => $code];
        write_file('./data/code.data', $codes);

        header("Location: {$redirect}");
    }
}

function askToken() {
    $clientId = $_GET['client_id'];
    $app = getApp($clientId);
    if ($app) {
        if ($_GET['client_secret'] === $app['client_secret']) {
            if (getCode($clientId, $_GET['code'])) {
                $token = uniqid('token');
                $expiration = 3600;
                $expirationDate = new \Datetime();
                $expirationDate->modify("+{$expiration} seconds");

                $tokens = read_file('./data/token.data');
                $tokens[] = ['client_id'=> $clientId, 'token' => $token, 'expires_in'=> $expirationDate->format('Y-m-d H:m')];
                write_file('./data/token.data', $tokens);

                echo json_encode([
                    'token' => $token,
                    'expires_in' => $expiration
                ]);
            }
        }
    }
}

function registerApp() {
    $app = $_POST;
    $app["client_id"] = uniqid('id');
    $app["client_secret"] = uniqid('secret');

    $registeredApps = read_file('./data/app.data');
    $registeredApps[] = $app;
    write_file('./data/app.data', $registeredApps);

    echo json_encode([
        "client_id" => $app["client_id"],
        "client_secret" => $app["client_secret"]
    ]);
}

$path = strtok($_SERVER["REQUEST_URI"], '?');

switch($path) {
    case '/register':
        registerApp();
        break;
    case '/auth':
        askAuthorization();
        break;
    case '/auth-success':
        askAuthorizationSuccess();
        break;
    case '/token':
        askToken();
        break;
}