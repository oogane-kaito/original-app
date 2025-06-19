<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\BusinessCard;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    public function store(Request $request, $businessCardId)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url|max:255', // リンクの最大長を設定
            'icon' => 'nullable|string|max:255', // アイコンのURL
        ]);

        $link = Link::create([
            'business_card_id' => $businessCardId,
            'title' => $request->title,
            'url' => $request->url,
            'icon' => $request->icon,
        ]);

        return response()->json($link, 201);
    }

    public function destroy($id)
    {
        $link = Link::findOrFail($id);
        $link->delete();

        return response()->json(null, 204);
    }
}