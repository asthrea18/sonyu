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
        return view('shop.top_long_sleve');
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

    public function body()
    {
        return view('shop/body');
    }


    public function Training()
    {
        return view('shop/training');
    }
}
