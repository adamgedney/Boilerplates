<?php



//User routes==========================//
Route::get('new-user/{email}/{pw}/{with}', 'UserController@newUser');

Route::get('check-user/{email}/{pw}', 'UserController@checkUser');

Route::get('get-user/{userId}', 'UserController@getUser');

Route::get('plus-user/{name}/{id}/{gender}', 'UserController@plusUser');

Route::get('update-user/{id}/{title}/{name}/{email}/{birthMonth}/{birthDay}/{birthYear}', 'UserController@updateUser');

Route::get('delete-user/{userId}', 'UserController@deleteUser');

Route::get('forgot/{email}', 'UserController@forgotPassword');

Route::get('check-reset-token/{token}', 'UserController@checkResetToken');

Route::get('reset-pass/{userId}/{password}', 'UserController@resetPassword');

Route::get('settings-reset-pass/{userId}/{currentPass}/{password}', 'UserController@resetSettingsPassword');

Route::get('restore-user/{email}/{pw}', 'UserController@restoreUser');

Route::get('set-theme/{userId}/{theme}', 'UserController@setTheme');










