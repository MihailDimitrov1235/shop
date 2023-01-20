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
                        ->with([
                            'categories',
                            'authors',
                            'categories.category' => function ($query) {
                                $query->select(
                                    'categories.id as id',
                                    'category_trans.name'
                                )->leftJoin('category_trans', function($q) {
                                    $q->on('category_trans.category_id', 'categories.id');
                                    $q->where('category_trans.lang', request()->query('lang'));
                                });

                                if(request()->query('categories')) {
                                    $query->where('category_trans.name', 'LIKE', '%'.request()->query('categories').'%');
                                }
                            },
                            'authors.author' => function ($query) {
                                $query->select(
                                    'authors.id as id',
                                    'authors.phone',
                                    'authors.email',
                                    'author_trans.name',
                                )->leftJoin('author_trans', function($q) {
                                    $q->on('author_trans.author_id', 'authors.id');
                                    $q->where('author_trans.lang', request()->query('lang'));
                                });

                                if(request()->query('authors')) {
                                    $query->where('author_trans.name', 'LIKE', '%'.request()->query('authors').'%');
                                }
                            },
                            'files'
                        ])
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

    public function getById($id) {

        $product = Product::select(
                                'products.id',
                                'product_trans.name as name',
                                'product_trans.shortDescription',
                                'product_trans.longDescription'
                            )
                            ->with(['categories', 'authors', 'categories.category', 'authors.author', 'files', 'trans', 'parts'])
                            ->leftJoin('product_trans', function($q) {
                                $q->on('product_trans.product_id', 'products.id');
                                $q->where('product_trans.lang', request()->query('lang'));
                            })
                            ->findOrFail($id);   

        return $product;
    }

    public function destroy(Request $request) {
        $ids = $request->selected;

        Product::whereIn('id', $ids)->delete();
        ProductFile::where('type', Product::class)->whereIn('parent_id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
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
