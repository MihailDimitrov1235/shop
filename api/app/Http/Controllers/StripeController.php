<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function index(){

        return view('/checkout');

    }

    public function checkout(){

        \Stripe\Stripe::setApiKey(config('stripe.sk'));

        $session = \Stripe\Checkout\Session::create([

            'line_items' => [
                
                [

                    'price_data' => [

                        'currency' => 'eur',
                        'product_data' => [

                            'name' => 'This is a test.',

                        ],
                        'unit_amount' => 500, //5.00 lv

                    ],
                    'quantity' => 1,

                ],

            ],
            'mode' => 'payment',
            'success_url' => route('success'),
            'cancel_url' => route('/'),

        ]);

        return redirect()->away($session->url);

    }

    public function success(){

        return view('/');

    }

}