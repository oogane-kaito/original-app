<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_card_id', 'title', 'url', 'icon',"delete"
    ];

    // 名刺とのリレーション
    public function businessCard()
    {
        return $this->belongsTo(BusinessCard::class);
    }
}