<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\{
    Product,
    ProductTrans,
    ProductCategory,
    ProductAuthor,
    ProductPart,
    ProductFile
};

class ProductController extends Controller
{
    public function index() {
        $query = Product::select(
                            'products.id',
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

        $product = Product::create();

        foreach(json_decode($request->lang, true) as $key=>$lang) {

            ProductTrans::create([
                'name' => $lang['name'],
                'shortDescription' => $lang['shortDescription'],
                'longDescription' => $lang['longDescription'],
                'product_id' => $product->id,
                'lang' => $key
            ]);
        }


        foreach(json_decode($request->category, true) as $category) {
            ProductCategory::create([
                'product_id' => $product->id,
                'category_id' => $category['value']
            ]);
        }

        foreach(json_decode($request->author, true) as $author) {
            ProductAuthor::create([
                'product_id' => $product->id,
                'author_id' => $author['value']
            ]);
        }

        $product_file = $request->file('picture');
        $this->uploadProductFiles($product_file, Product::class, $product->id);

        foreach(json_decode($request->parts) as $key=>$part) {
            $createdPart = ProductPart::create([
                'price' => $part->price,
                'product_id' => $product->id
            ]);

            $parts_file = $request->file('partsFiles.' . $key . '.uploader');

            $this->uploadProductFiles($parts_file, ProductPart::class, $createdPart->id);
        }

        return $product;
    }

    private function uploadProductFiles($files, $type, $productId) {
        foreach ($files as $key => $file) {
            $file_path = $file->store('products', 'public');

            ProductFile::create([
                'path' => $file_path,
                'parent_id' => $productId,
                'type' => $type
            ]);
        }
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

    public function uploadFiles(Request $request) {
        // $this->validate($request, [
        //     'path' => 'required|image|mimes:jpg,png,jpeg,gif,svg,docx,do|max:2048',
        // ]);
        $file_path = $request->file('file')->store('products', 'public');

        // $data = ProductFile::create([
        //     'image' => $file_path,
        // ]);

        return response($file_path, 201);
    }
}
