<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exchange extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
    ];

    // 交換リクエストとのリレーション
    public function request()
    {
        return $this->belongsTo(ExchangeRequest::class, 'request_id');
    }
}