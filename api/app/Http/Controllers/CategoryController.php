<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $query = Category::select('id', 'name');

        if(request()->query('id')) {
            $query->where('id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->has(['field', 'direction'])){
            $query->orderBy(request()->query('field'), request()->query('direction'));
        }

        if(request()->query('total')) {
            $categories = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $categories = $query->paginate(10)->withQueryString();
        }

        return $categories;
    }

    public function store(Request $request)
    {
        $category = Category::create(['name' => $request->name]);

        return response()->json(['category' => $category], 200); 
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        Category::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function edit(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $category->update([
            'name' => $request->name
        ]);

        return response()->json(['category' => $category], 200); 
    }

    public function getById($id)
    {
        $category = Category::findOrFail($id);

        return $category;
    }

    public function getAll()
    {
        $categories = Category::all();

        return $categories;
    }
}
