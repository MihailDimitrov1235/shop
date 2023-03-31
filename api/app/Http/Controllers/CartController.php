<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartProduct;

class CartController extends Controller
{
    public function addProduct(Request $request)
    {
        $cartProduct = CartProduct::create([
            'product_id' => $request->product_id,
            'part_id' => $request->part_id,
            'cart_id' => $request->cart_id
        ]);

        return $cartProduct;
    }

    public function removeProduct($id)
    {
        $cartProduct = CartProduct::findOrFail($id);

        $cartProduct->delete();

        return 'Deleted';
    }
}
