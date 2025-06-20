<?php

// app/Http/Controllers/BusinessCardController.php

namespace App\Http\Controllers;

use App\Models\BusinessCard;
use App\Models\Link;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// //指定されたIdのリンクがあるのか判定する関数
function linkExists($id) {
    try {

        // リンクを取得し、存在すれば true を返す
        Link::findOrFail($id);
        dd($link);

        return true;
    } catch (ModelNotFoundException $e) {
        // リンクが存在しない場合は false を返す

        return false;
    }
}

class BusinessCardController extends Controller
{
    public function index()
    {
         // 現在のユーザーに関連する名刺を取得し、リンクも一緒に取得
        $businessCard = BusinessCard::with('links')->where('user_id', Auth::id())->first();
        return response()->json([
            'businessCard' => $businessCard,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000', // 例: 最大1000文字
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20', // 電話番号の最大長を設定
            'avatar' => 'nullable|string|max:255', // アバターのURL
            'background_color' => 'nullable|string|max:7', // 例: '#ffffff'
            'text_color' => 'nullable|string|max:7',
            'accent_color' => 'nullable|string|max:7',
             'theme' => 'required|string', // バリデーションを追加
        ]);

        $businessCard = BusinessCard::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'title' => $request->title,
            'bio' => $request->bio,
            'email' => $request->email,
            'phone' => $request->phone,
            'avatar' => $request->avatar,
            'background_color' => $request->background_color,
            'text_color' => $request->text_color,
            'accent_color' => $request->accent_color,
            'theme' => $request->theme,
        ]);

        return response()->json($businessCard, 201);
    }

    public function show($id)
    {
        $businessCard = BusinessCard::findOrFail($id);
        return response()->json($businessCard);
    }



    public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'nullable|string|max:255',
        'title' => 'nullable|string|max:255',
        'bio' => 'nullable|string|max:1000',
        'email' => 'nullable|email|max:255',
        'phone' => 'nullable|string|max:20',
        'avatar' => 'nullable|string|max:255',
        'background_color' => 'nullable|string|max:7',
        'text_color' => 'nullable|string|max:7',
        'accent_color' => 'nullable|string|max:7',
        'theme' => 'required|string', // バリデーションルール
        'links' => 'nullable|array',
        'links.*.id' => 'nullable',// 既存のリンクIDが必要
        'links.*.title' => 'required|string|max:255',
        'links.*.url' => 'required|url|max:255',
        'links.*.icon' => 'nullable|string|max:255',
        'links.*.delete' => 'nullable|boolean',
    ]);

    $businessCard = BusinessCard::findOrFail($id);
    $businessCard->update($request->only(['name',
     'title', 
     'bio', 
     'email', 
     'phone', 
     'avatar', 
     'background_color', 
     'text_color', 
     'accent_color', 
     'theme',
     'visibility'
    ])
    );

    // リンクの更新処理
    if ($request->has('links')) {
        foreach ($request->links as $linkData) {
            if (isset($linkData['delete']) && $linkData['delete']) {

                // リンクが削除される場合
                $link = Link::findOrFail($linkData['id']);
                $link->delete();
               
            } else {
                // if (linkExists($linkData['id'])) {
                //     // リンクが更新される場合

                //     dd($link);
                //     $link = Link::findOrFail($linkData['id']);
                //     $link->update([
                //         'title' => $linkData['title'],
                //         'url' => $linkData['url'],
                //         'icon' => $linkData['icon'] ?? null, // アイコンはオプション
                //         'delete' => $linkData['delete'] 
                //     ]);
                // } else {
                    // 新しいリンクが追加される場合
                    Link::create([
                        'business_card_id' => $businessCard->id, // ビジネスカードとのリレーション
                        'title' => $linkData['title'],
                        'url' => $linkData['url'],
                        'icon' => $linkData['icon'] ?? null, // アイコンはオプション
                        'delete' => $linkData['delete'] ?? false, 
                    ]);
                // }
                
            }
        }
    }

    return response()->json($businessCard);
}

    

    public function destroy($id)
    {
        $businessCard = BusinessCard::findOrFail($id);
        $businessCard->delete();

        return response()->json(null, 204);
    }
}
