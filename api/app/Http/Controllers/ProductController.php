<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() {
        // $query = Product::select('id', 'name', 'authors', 'categories', 'parts');

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

        // if(request()->query('total')) {
        //     $categories = $query->paginate(request()->query('total'))->withQueryString();
        // }else {
        //     $categories = $query->paginate(10)->withQueryString();
        // }

        // return $categories;
        $projects = Product::all();   

        return $projects;
    }

    public function store(Request $request) {
        $project = Product::create([
            'name' => $request->Name,
            'stripe_plan' => $request->stripe_plan,
            'ShortDescription' => $request->ShortDescription,
            'Description' => $request->Description
        ]);   
        return $project;
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
