<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id', 'recipient_id', 'status',
    ];

    // 送信者とのリレーション
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // 受取人とのリレーション
    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }
}