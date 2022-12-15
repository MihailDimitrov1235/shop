<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function pay(Request $request){

        // Include the Stripe PHP library
        require_once('path/to/stripe-php/init.php');

        // Set your Stripe API key
        \Stripe\Stripe::setApiKey('YOUR_STRIPE_API_KEY'); // !!!! NOT DONE !!!!

        // Collect the customer's payment information
        $card = array(
            'number' => $request->number,
            'exp_month' => $request->exp_month,
            'exp_year' => $request->exp_year,
            'cvc' => $request->cvc
        );
        
        // Create a Stripe token representing the customer's payment information
        $token = \Stripe\Token::create(array(
            'card' => $card,
        ));

        $charge = \Stripe\Charge::create(array(
            'amount' => 1000, //1000 = 10.00$
            'currency' => 'usd',
            'description' => 'Example charge',
            'source' => $token,
          ));
    }
}
