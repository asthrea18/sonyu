<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


/* Shop */
Route::group(['prefix' => 'shop'], function () {

    Route::get('best', 'NavigatorController@best');
    Route::get('body', 'NavigatorController@body');
    Route::get('training', 'NavigatorController@training');

}); /* Shop */


