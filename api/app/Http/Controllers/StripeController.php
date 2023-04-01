<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class StripeController extends Controller
{
    public function checkout($id){

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

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
            'success_url' => route('checkout.success', [], true) . "?session_id={CHECKOUT_SESSION_ID}",
            'cancel_url' => route('checkout.cancel', [], true),

        ]);
        
        return response()->json([
            'url' => $session->url
        ]);
    }

    public function success(Request $request)
    {

        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        $sessionId = $request->get('session_id');
        try {

            $session = $stripe->checkout->sessions->retrieve($sessionId);

            if (!$session) {
                throw new NotFoundHttpException();
            }

            $order = Order::where('session_id', $session->id)->first();
            if (!$order) {
                $user = auth()->user();
                $user->plan_id = null;
                $user->save();

                throw new NotFoundHttpException();
            }
            if ($order->status === 'unpaid') {
                $order->status = 'paid';
                $order->save();
            }

            // $payment = new Payment();
            // $payment->order_id = $order->id;
            // $payment->st_cus_id = $session->customer;
            // $payment->st_sub_id = $session->subscription;
            // $payment->st_payment_intent_id = $session->payment_intent;
            // $payment->st_payment_method = $session->payment_method_types[0];
            // $payment->st_payment_status = $session->payment_status;
            // $payment->date = $session->created;
            // $payment->save();

            return redirect()->away('http://localhost:3000/plans/payment/success');
        } catch (\Exception $e) {
            throw new NotFoundHttpException();
        }
    }

    public function cancel()
    {
        return redirect()->away('http://localhost:3000/payment/cancellation');
    }

}