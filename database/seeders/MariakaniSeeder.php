<?php

namespace Database\Seeders;

use App\Models\BoardMember;
use App\Models\ContentBlock;
use App\Models\DownloadDocument;
use App\Models\NewsUpdate;
use App\Models\Project;
use App\Models\SiteStat;
use App\Models\Ward;
use Illuminate\Database\Seeder;

class MariakaniSeeder extends Seeder
{
    /**
     * NOTE: Everything below is PLACEHOLDER content so the site has something
     * to render while real Mariakani Municipality content is being gathered.
     * Replace names, ward boundaries, board members, and figures with verified
     * sources (the Municipal Charter, ISUDP plan, IEBC ward list, etc.) before
     * launch.
     */
    public function run(): void
    {
        ContentBlock::create([
            'key' => 'objectives',
            'title' => "Municipality's Objectives",
            'body' => 'Efficient management, development, public order, high social services, civic duty, and community well-being.',
        ]);

        ContentBlock::create([
            'key' => 'functions',
            'title' => "Municipality's Functions",
            'body' => 'Manage waste, water, roads, stormwater, walkways, parks, lighting, traffic, advertising, markets, and the livestock sale yard.',
        ]);

        ContentBlock::create([
            'key' => 'boundaries',
            'title' => 'Municipality Boundaries',
            'body' => 'The Municipality adheres to the boundaries set out in its Integrated Strategic Urban Development Plan (ISUDP), encompassing the wards listed below. [Placeholder — confirm exact ward list against the Municipal Charter.]',
        ]);

        ContentBlock::create([
            'key' => 'mission',
            'title' => 'About Mariakani Municipality',
            'body' => "Mariakani Municipality is a fast-growing urban centre and key transport and trade hub along the Mombasa-Nairobi corridor in Kilifi County. [Placeholder copy — replace with verified municipal history, charter date, and mandate under the Urban Areas and Cities Act.]",
        ]);

        ContentBlock::create([
            'key' => 'governor_message',
            'title' => 'Message from the Governor',
            'body' => "[Placeholder — insert the Governor's actual message once supplied by the County Communications office. Keep it focused on Mariakani's role as a logistics, livestock-trade, and urban growth centre for Kilifi County.]",
            'byline' => "H.E. [Governor's Name]",
            'byline_role' => 'Governor, Kilifi County',
        ]);

        SiteStat::insert([
            ['label' => 'Urban Infrastructure', 'value' => '0', 'suffix' => '+', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Community Engagement', 'value' => '0', 'suffix' => '%', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Economic Growth', 'value' => '0', 'suffix' => '%', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['label' => 'Environmental Initiatives', 'value' => '0', 'suffix' => '%', 'order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        $wards = [
            'Mariakani Town',
            'Mwanamwinga',
            'Kayafungo',
            'Mwawesa',
            'Kaloleni', // placeholder list — confirm against IEBC / county gazette
        ];
        foreach ($wards as $i => $name) {
            Ward::create([
                'name' => $name,
                'description' => '[Placeholder ward description.]',
                'order' => $i + 1,
            ]);
        }

        $board = [
            ['name' => '[Chairman Name]', 'role' => 'Chairman'],
            ['name' => '[Vice Chairperson Name]', 'role' => 'Vice Chairperson'],
            ['name' => '[Board Member Name]', 'role' => 'Board Member'],
            ['name' => '[Board Member Name]', 'role' => 'Board Member'],
            ['name' => '[Municipal Manager Name]', 'role' => 'Municipal Manager'],
        ];
        foreach ($board as $i => $member) {
            BoardMember::create([
                'name' => $member['name'],
                'role' => $member['role'],
                'bio' => 'Placeholder biography — extensive experience in public administration and urban governance.',
                'order' => $i + 1,
            ]);
        }

        $projects = [
            [
                'title' => 'Mariakani Bus Park & Boda Boda Terminus Upgrade',
                'summary' => 'Modernising the town\'s public transport terminus to ease congestion on the Mombasa-Nairobi highway frontage.',
                'category' => 'Transport',
            ],
            [
                'title' => 'Mariakani Livestock Sale Yard Rehabilitation',
                'summary' => 'Upgrading holding pens, weighing infrastructure, and drainage at the municipal livestock market.',
                'category' => 'Markets',
            ],
            [
                'title' => 'CBD Stormwater Drainage Works',
                'summary' => 'Flood mitigation works for the central business district during the rainy season.',
                'category' => 'Drainage',
            ],
        ];
        foreach ($projects as $i => $p) {
            Project::create([
                'title' => $p['title'],
                'slug' => str($p['title'])->slug(),
                'summary' => $p['summary'],
                'description' => '[Placeholder — replace with verified project scope, funding source, timeline, and contractor details.]',
                'category' => $p['category'],
                'status' => 'ongoing',
                'order' => $i + 1,
            ]);
        }

        NewsUpdate::create([
            'title' => 'Welcome to the new Mariakani Municipality website',
            'slug' => 'welcome-to-the-new-site',
            'excerpt' => 'The Municipality launches a new digital home for residents, investors, and partners.',
            'body' => '[Placeholder article body.]',
            'published_at' => now(),
        ]);

        DownloadDocument::create([
            'title' => 'Municipal Charter (Placeholder)',
            'category' => 'Policies',
            'file_path' => 'downloads/placeholder.pdf',
            'file_size' => '0 KB',
            'uploaded_at' => now(),
        ]);
    }
}