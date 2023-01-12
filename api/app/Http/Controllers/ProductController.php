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
        $query = Product::with(['trans', 'categories', 'authors', 'categories.category', 'authors.author']);

        // if(request()->query('id')) {
        //     $query->where('id', 'LIKE', '%'.request()->query('id').'%');
        // }

        // if(request()->query('name')) {
        //     $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        // }

        // if(request()->query('authors')) {
        //     $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        // }

        // if(request()->query('categories')) {
        //     $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        // }

        // if(request()->query('parts')) {
        //     $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        // }

        // if(request()->has(['field', 'direction'])){
        //     $query->orderBy(request()->query('field'), request()->query('direction'));
        // }

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
