<?php
use App\Http\Middleware\JwtFromCookieMiddleware;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// 1. ROTA PARA TRATAR O PRÉ-VOO (OPTIONS)
// Isso resolve o erro 404 e adiciona os cabeçalhos CORS necessários
Route::options('{all}', function () {
    // Retorna 200 OK
    return response('', 200)
        // Permite acesso de qualquer domínio
        ->header('Access-Control-Allow-Origin', '*')
        // Permite os métodos usados (OPTIONS é essencial)
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
        // Permite os cabeçalhos necessários, incluindo 'Authorization' para o JWT
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization, X-Requested-With, Accept');
})->where('all', '.*');

// 2. SUAS ROTAS EXISTENTES VÊM DEPOIS
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware([JwtFromCookieMiddleware::class, 'auth:api'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/user', [AuthController::class, 'updateUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
});