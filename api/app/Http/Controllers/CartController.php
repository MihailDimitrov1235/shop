<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    Cart,
    CartProduct,
    Product
};

class CartController extends Controller
{
    public function index($userId)
    {
        $query = Cart::where('user_id', $userId)
                        ->with([
                            'products' => function ($query) {
                                $query->select(
                                        'cart_product.id',
                                        'cart_product.cart_id',
                                        'cart_product.product_id',
                                        'cart_product.part_id',
                                        'product_trans.name as title',
                                        'product_trans.shortDescription as description',
                                        'product_files.path as image'
                                    )
                                    ->leftJoin('product_trans', function($q) {
                                        $q->on('product_trans.product_id', 'cart_product.product_id');
                                        $q->where('product_trans.lang', request()->query('lang'));
                                    })
                                    ->leftJoin('product_files', function($q) {
                                        $q->on('product_files.parent_id', 'cart_product.product_id');
                                        $q->where('product_files.type', Product::class);
                                    });
                            },
                            'products.parts'
                        ]);

        return $query->first();
    }


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
