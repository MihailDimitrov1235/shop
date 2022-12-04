<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index() {

        $projects = Project::all();   

        return $projects;
    }

    public function store(Request $request) {
        $project = Project::create([
            'ProjectName' => $request->ProjectName,
            'Name' => $request->Name,
            'stripe_plan' => $request->Name,
            'ShortDescription' => $request->ShortDescription,
            'Description' => $request->Description
        ]);   
        return $project;
    }

    public function view($id) {

        $project = Project::findOrFail($id);   

        return $project;
    }

    public function destroy($id) {

        $project = Project::findOrFail($id);   
        $project->delete();
        return "This project no longer exists.";
    }
}
