# ここで交換画面用のコンポーネントを利用する



## 名刺交換の方法
qrコードから読み取って交換||アクセスコードを入力して交換をする！
→postリクエストを送る→



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
こっちはリダイレクトされないのに
