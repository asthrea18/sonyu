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
    Route::get('outer', 'NavigatorController@outer');
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
    Route::get('top', 'NavigatorController@Top');

    /* shirt */
    Route::get('shirt', 'NavigatorController@Shirt');

    /* training */
    Route::get('training', 'NavigatorController@Training');
    /* basic */
    Route::get('basic', 'NavigatorController@Basic');

    /* skirt */
    Route::get('skirt', 'NavigatorController@Skirt');
    /* shoes */
    Route::get('shoe-brand', 'NavigatorController@Shoebrand');
    Route::get('shoe', 'NavigatorController@Shoe');
    Route::get('shoe-walker', 'NavigatorController@Shoewalker');
    Route::get('shoe-sneaker', 'NavigatorController@Shoesneaker');
    Route::get('shoe-sandal', 'NavigatorController@Shoesandal');
    /* shirt-blouse */
    Route::get('shirt-blouse', 'NavigatorController@Shirt');
    /* pants */
    Route::get('pants-brand', 'NavigatorController@Pantsbrand');
    Route::get('pants-slacks', 'NavigatorController@Pantsslacks');
    Route::get('pants-short', 'NavigatorController@Pantsshort');
    Route::get('pants-recommended', 'NavigatorController@Pantsrec');
    Route::get('pants-long', 'NavigatorController@Pantslong');
    Route::get('pants-leggings', 'NavigatorController@Pantsleggings');
    Route::get('pants-denim', 'NavigatorController@Pantsdenim');
    Route::get('pants-cotton', 'NavigatorController@Pantscotton');
    Route::get('pants-bluejean', 'NavigatorController@Pantsjean');
    /* one piece */
    Route::get('onepiece', 'NavigatorController@Onepiece');
    /* one piece */
    Route::get('bag', 'NavigatorController@bag');
    Route::get('bag-backpack', 'NavigatorController@bagbackpack');
    Route::get('bag-crosstoe', 'NavigatorController@bagcrosstoe');
    /* accessories */
    Route::get('accessories', 'NavigatorController@accessories');
    Route::get('acce-jewerly', 'NavigatorController@accejewerly');
    Route::get('acce-stockings', 'NavigatorController@accestockings');
    Route::get('acce-halt', 'NavigatorController@accehalt');



    Route::get('member/login', 'NavigatorController@userlog');
    Route::get('member/register-terms', 'NavigatorController@registerterms');
    Route::get('member/register-form', 'NavigatorController@registerform');
    Route::get('member/user-page', 'NavigatorController@userpage');
}); /* Shop */


