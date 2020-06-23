<?php

/**
 * @param string $filename
 * @return array
 */
function read_file($filename)
{
    if (!file_exists($filename)) throw new \Exception($filename . ' not found');
    $data = file($filename);
    return array_map(fn ($item) => unserialize($item), $data);
}

/**
 * @param array $data
 * @param string $filename
 * @return int
 */
function write_file($data, $filename)
{
    $data = array_map(fn ($item) => serialize($item), $data);
    return file_put_contents($filename, implode(PHP_EOL, $data));
}

function getApp($url)
{
    $data = read_file('./data/app.data');
    foreach ($data as $value) {
        if ($value['uri'] === $url) {
            return $value;
        }
    }
    return false;
}

function getClient($id)
{
    $data = read_file('./data/app.data');
    foreach ($data as $value) {
        if ($value['client_id'] === $id) {
            return $value;
        }
    }
    return false;
}

function register()
{
    [
        "name" => $name,
        "uri" => $uri,
        "redirect_success" => $redirect_sucess,
        "redirect_error" => $redirect_error
    ] = $_POST;
    // Test if app already registered
    $app = getApp($uri);
    if ($app) {
        echo ("Url Already registered");
    } else {
        $data = read_file('./data/app.data');
        $client_id = uniqid('client_', true);
        $data[] = [
            "name" => $name,
            "uri" => $uri,
            "redirect_success" => $redirect_sucess,
            "redirect_error" => $redirect_error,
            "client_id" => $client_id,
            "client_secret" => sha1($client_id)
        ];
        write_file($data, './data/app.data');

        header('Content-Type: application/json');
        echo (json_encode([
            "client_id" => $client_id,
            "client_secret" => sha1($client_id)
        ]));
    }
}

/**
 * https://auth-server/auth?
 *    response_type=code&client_id=..
 *    &scope=...&state=...&redirect_uri=...
 *
 * 1) Récupérer tous les paramètres de requêtes
 * 2) Afficher un page (nom, uri, buttons approuve/cancel)
 *      Approuve: /auth-sucess?client_id=...
 *      Cancel: /auth-cancel
 */
function auth()
{
    // Get request parameters
    [
        'response_type' => $response_type,
        'client_id'     => $client_id,
        'state'         => $state
    ] = $_GET;

    $client = getClient($client_id);
    if ($client) {
        echo $client['name'];
        echo $client['uri'];
        echo "<a href='/auth-success?client_id=" . $client_id . "&state=" . $state . "'>Approuve</a>";
    } else {
        http_response_code(404);
    }
}

/**
 * 1) --Récupérer tous les paramètres de requêtes--
 * 2) --Si approuve, générer un code et sa date d'expiration (5sec), sauvegarder en base--
 * 3) --Rediriger vers l'url de redirection success de l'app avec le code et le state--
 */
function authSucess()
{
    [
        'client_id' => $client_id,
        'state'     => $state
    ] = $_GET;

    $code = uniqid();
    $expiration = new DateTime('+ 120 seconds');
    $data = read_file('./data/code.data');
    $data[] = [
        'code'       => $code,
        'expiration' => $expiration,
        'client_id'  => $client_id
    ];
    write_file($data, './data/code.data');

    header('Location: ' . getClient($client_id)['redirect_success'] . '?code=' . $code . '&state=' . $state);
}

/**
 * https://auth-server/token?
 *  grant_type=authorization_code&
 *  client_id=..&client_secret=...&
 *  code=...&redirect_uri=...
 * 
 * 1) --Récupérer les paramètres de la requête--
 * 2) --Vérifier les credentials--
 * 3) Vérifier que le code existe et qu'il n'a pas expiré
 * 4) Générer un token et sa date d'expiration (1H), sauvegarder en base (ajouter user_id)
 * 4) Renvoyer le tout au format JSON
 */
function exchangeAuthorizationCodeToToken(array $client, string $code)
{
    if ($code) {
        $client_code = getCode($client["client_id"], $code);
        // Check code validity
        if ($client_code && $client_code['expiration'] > new DateTime()) {
            // Generate token
            $token = uniqid();
            $token_expiration = new DateTime('+ 1 hours');
            $user_id = uniqid();
            // Save into database
            $data = read_file('./data/token.data');
            $data[] = [
                'token' => $token,
                'token_expiration' => $token_expiration,
                'user_id' => $user_id
            ];
            write_file($data, './data/token.data');
            // Send it to client server
            echo json_encode(["access_token" => $token, "expirationDate" => $token_expiration]);
        }
    }
}

function exchangePasswordToToken(string $username, string $password)
{
    if ($username && $password) {
        if ($username == 'user' && $password == 'password') {
            // Generate token
            $token = uniqid();
            $token_expiration = new DateTime('+ 1 hours');
            $user_id = uniqid();
            // Save into database
            $data = read_file('./data/token.data');
            $data[] = [
                'token' => $token,
                'token_expiration' => $token_expiration,
                'user_id' => $user_id
            ];
            write_file($data, './data/token.data');
            // Send it to client server
            echo json_encode(["access_token" => $token, "expirationDate" => $token_expiration]);
        }
    }
}

function exchangeClientCredentialToToken(array $client)
{
    // Generate token
    $token = uniqid();
    $token_expiration = new DateTime('+ 1 hours');
    // Save into database
    $data = read_file('./data/token_client.data');
    $data[] = [
        'client_id' => $client['client_id'],
        'token' => $token,
        'token_expiration' => $token_expiration,
    ];
    write_file($data, './data/token_client.data');
    // Send it to client server
    echo json_encode(["access_token" => $token, "expirationDate" => $token_expiration]);
}


function token()
{
    // Get request parameters
    [
        'grant_type' => $grant_type,
        'client_id' => $client_id,
        'redirect_uri' => $redirect_uri,
        'client_secret' => $client_secret
    ] = $_GET;
    // Check client credentials
    $client = getClient($client_id);
    if ($client && $client['client_secret'] === $client_secret) {
        switch ($grant_type) {
            case 'authorization_code':
                ['code' => $code] = $_GET;
                exchangeAuthorizationCodeToToken($client, $code);
                break;
            case 'client_credentials':
                exchangeClientCredentialToToken($client);
                break;
            case 'password':
                // Get REQUEST PARAMS for PASSWORD process
                [
                    'username' => $username,
                    'password' => $password
                ] = $_GET;
                exchangePasswordToToken($username, $password);
                break;
        }
    }
}

function getCode($client_id, $code)
{
    $data = read_file('./data/code.data');
    foreach ($data as $value) {
        if ($value['client_id'] === $client_id && $value['code'] === $code) {
            return $value;
        }
    }
    return false;
}


$route = strtok($_SERVER['REQUEST_URI'], '?');
switch ($route) {
    case '/register':
        register();
        break;
    case '/auth':
        auth();
        break;
    case '/auth-success':
        authSucess();
        break;
    case '/token':
        token();
        break;
    case '/me':
        error_log(json_encode(getallheaders()));
        echo json_encode(["id" => 213124, "email" => "test@test.com"]);
        break;
}
