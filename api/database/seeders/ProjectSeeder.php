<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = [
            [
                'ProjectName' => 'Premium', 
                'Name' => 'premium', 
                'stripe_plan' => 'price_1LmB1SCXbPPKAWayGsb1DAkq', 
                'ShortDescriptionBG' => "cock", 
                'DescriptionBG' => 'Premium'
            ],
            [
                'ProjectName' => 'Premium', 
                'Name' => 'premium', 
                'stripe_plan' => 'price_1LnwbTCXbPPKAWay3ByKpcfq', 
                'ShortDescriptionBG' => "cock", 
                'DescriptionBG' => 'Premium'
            ]
        ];
   
        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
