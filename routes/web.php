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

    /* Outer */
    Route::get('card', 'NavigatorController@Cardigan');
    Route::get('field', 'NavigatorController@Field');
    Route::get('jacket', 'NavigatorController@Jacket');
    Route::get('padding', 'NavigatorController@Padding');
    Route::get('fleece', 'NavigatorController@Fleece');

    /* top */
    Route::get('longsleeve', 'NavigatorController@Longsleeve');
    Route::get('man', 'NavigatorController@Man');
    Route::get('hood', 'NavigatorController@Hood');
    Route::get('shortsleeve', 'NavigatorController@Shortsleeve');
    Route::get('neat', 'NavigatorController@Neat');

    /* shirt */
    Route::get('shirt', 'NavigatorController@Shirt');

    /* training */
    Route::get('training', 'NavigatorController@Training');

    /* one piece */
    Route::get('onepiece', 'NavigatorController@Onepiece');

}); /* Shop */


