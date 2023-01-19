<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    Category,
    CategoryTrans
};

class CategoryController extends Controller
{
    public function index()
    {
        $query = Category::select(
                            'categories.id as id',
                            'category_trans.name'
                        )
                        ->leftJoin('category_trans', function($q) {
                            $q->on('category_trans.category_id', 'categories.id');
                            $q->where('category_trans.lang', request()->query('lang'));
                        });

        if(request()->query('id')) {
            $query->where('categories.id', 'LIKE', '%'.request()->query('id').'%');
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
        $category = Category::create();

        foreach($request->lang as $key=>$lang) {

            CategoryTrans::create([
                'name' => $lang['name'],
                'category_id' => $category->id,
                'lang' => $key
            ]);
        }

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

        foreach($request->lang as $key=>$lang) {
            CategoryTrans::where(['category_id' => $id, 'lang' => $key])
                        ->update(['name' => $lang['name']]);
        }

        return response()->json(['category' => $category], 200); 
    }

    public function getById($id)
    {
        $category = Category::with('trans')->findOrFail($id);

        return $category;
    }

    public function getAll()
    {
        $categories = Category::all();

        return $categories;
    }
}
