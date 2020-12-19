<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NavigatorController extends Controller
{
    public function best()
    {
        return view('shop/best');
    }

    public function Cardigan(){
        return view('shop.outer_cardigan');
    }

    public function Field(){
        return view('shop.outer_field');
    }

    public function Jacket(){
        return view('shop.outer_jacket');
    }

    public function Padding(){
        return view('shop.outer_padding');
    }

    public function Fleece(){
        return view('shop.outer_fleece');
    }

    public function Longsleeve(){
        return view('shop.top_long_sleeve');
    }
    public function Top()
    {
        return view('shop/top');
    }
    public function Shortsleeve()
    {
        return view('shop/top_short_sleeve');

    }
    public function Man(){
        return view('shop.top_man');
    }

    public function Hood(){
        return view('shop.top_hood');
    }

    public function Neat(){
        return view('shop/top_neat');
    }

    public function Shirt(){
        return view('shop/shirt_blouse');
    }
    public function Onepiece(){
        return view('shop/onepiece');
    }

    public function body()
    {
        return view('shop/body');
    }
    public function Training()
    {
        return view('shop/training');
    }
    public function Basic()
    {
        return view('shop/basic');
    }

    public function Skirt()
    {
        return view('shop/skirt');
    }
    public function Shoebrand()
    {
        return view('shop/shoes_brand');
    }
    public function Shoe()
    {
        return view('shop/shoes');
    }
    public function Shoewalker()
    {
        return view('shop/shoes_walker');
    }
    public function Shoesneaker()
    {
        return view('shop/shoes_sneaker');
    }
    public function Shoesandal()
    {
        return view('shop/shoes_sandal');
    }
    public function Pantsbrand()
    {
        return view('shop/pants_under_brand');
    }
    public function Pantsslacks()
    {
        return view('shop/pants_slacks');
    }
    public function Pantsshort()
    {
        return view('shop/pants_short');

    }
    public function Pantsrec()
    {
        return view('shop/pants_recommended');
    }
    public function Pantslong()
    {
        return view('shop/pants_long');
    }
    public function Pantsleggings()
    {
        return view('shop/pants_legging');
    }
    public function Pantsdenim()
    {
        return view('shop/pants_denim');
    }
    public function Pantscotton()
    {
        return view('shop/pants_cotton');
    }

    public function Pantsjean()
    {
        return view('shop/pants_bluejean');
    }

    public function outer()
    {
        return view('shop/outer');
    }
    public function bag()
    {
        return view('shop/bag');
    }
    public function bagbackpack()
    {
        return view('shop/bag_backpack');
    }
    public function bagcrosstoe()
    {
        return view('shop/bag_crosstoe');
    }
    public function accessories()
    {
        return view('shop/accessories');
    }
    public function accejewerly()
    {
        return view('shop/acc_jewerly');
    }
    public function accestockings()
    {
        return view('shop/acc_stockings');
    }
    public function accehalt()
    {
        return view('shop/acc_halt_belt');
    }
    public function userlog()
    {
        return view('member/login');
    }
    public function registerterms()
    {
        return view('member/registration_agree');
    }
    public function registerform()
    {
        return view('member/registration_form');
    }
    public function userpage()
    {
        return view('member/user_page');
    }


}
