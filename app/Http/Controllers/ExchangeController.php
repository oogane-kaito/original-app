<?php

namespace App\Http\Controllers;

use App\Models\Exchange;
use App\Models\ExchangeRequest;
use Illuminate\Http\Request;

class ExchangeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'request_id' => 'required|exists:exchange_requests,id',
        ]);

        $exchange = Exchange::create([
            'request_id' => $request->request_id,
        ]);

        return response()->json($exchange, 201);
    }
}