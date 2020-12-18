<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NavigatorController extends Controller
{
    public function best()
    {
        return view('shop/best');
    }

    public function body()
    {
        return view('shop/body');
    }
    public function training()
    {
        return view('shop/training');
    }
}
