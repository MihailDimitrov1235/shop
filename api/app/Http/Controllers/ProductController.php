<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\{
    Product,
    ProductTrans,
    ProductCategory,
    ProductAuthor
};

class ProductController extends Controller
{
    public function index() {
        $query = Product::select(
                            'products.id',
                            'products.parts',
                            'product_trans.name as name',
                            'product_trans.shortDescription',
                            'product_trans.longDescription'
                        )
                        ->with(['categories', 'authors', 'categories.category', 'authors.author'])
                        ->leftJoin('product_trans', function($q) {
                            $q->on('product_trans.product_id', 'products.id');
                            $q->where('product_trans.lang', request()->query('lang'));
                        });

        if(request()->query('id')) {
            $query->where('products.id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('authors')) {
            $query->whereHas('authors', function ($q) {
                $q->whereHas('author', function ($q) {
                    $q->where('name', 'LIKE', '%'.request()->query('authors').'%');
                });
            });
        }

        if(request()->query('categories')) {
            $query->whereHas('categories', function ($q) {
                $q->whereHas('category', function ($q) {
                    $q->where('name', 'LIKE', '%'.request()->query('categories').'%');
                });
            });
        }

        if(request()->query('parts')) {
            $query->where('parts', 'LIKE', '%'.request()->query('parts').'%');
        }

        if(request()->has(['field', 'direction'])){
            $query->orderBy(request()->query('field'), request()->query('direction'));
        }

        if(request()->query('total')) {
            $products = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $products = $query->paginate(10)->withQueryString();
        } 

        return $products;
    }

    public function store(Request $request) {

        $product = Product::create(['parts' => $request->parts]);

        ProductTrans::create([
            'name' => $request->name,
            'shortDescription' => $request->shortDescription,
            'longDescription' => $request->longDescription,
            'product_id' => $product->id,
            'lang' => 'bg'
        ]);

        foreach($request->category as $category) {
            ProductCategory::create([
                'product_id' => $product->id,
                'category_id' => $category['value']
            ]);
        }

        foreach($request->author as $author) {
            ProductAuthor::create([
                'product_id' => $product->id,
                'author_id' => $author['value']
            ]);
        }


        return $product;
    }

    public function view($id) {

        $project = Product::findOrFail($id);   

        return $project;
    }

    public function destroy($id) {

        $project = Product::findOrFail($id);   
        $project->delete();
        return "This project no longer exists.";
    }
}
