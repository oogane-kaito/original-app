<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'title', 'bio', 'email', 'phone', 'avatar',
        'background_color', 'text_color', 'accent_color','theme'
    ];

    // ユーザーとのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // リンクとのリレーション
    public function links()
    {
        return $this->hasMany(Link::class);
    }
}
