<?php

namespace App\Http\Controllers;

use App\Models\ExchangeRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExchangeRequestController extends Controller
{
    public function sendRequest(Request $request)
    {
        $request->validate([
            'recipient_id' => 'required|exists:users,id',
        ]);

        $exchangeRequest = ExchangeRequest::create([
            'sender_id' => Auth::id(),
            'recipient_id' => $request->recipient_id,
            'status' => 'pending',
        ]);

        return response()->json($exchangeRequest, 201);
    }

    public function acceptRequest($id)
    {
        $request = ExchangeRequest::findOrFail($id);
        $request->status = 'accepted';
        $request->save();

        return response()->json($request);
    }

    public function rejectRequest($id)
    {
        $request = ExchangeRequest::findOrFail($id);
        $request->status = 'rejected';
        $request->save();

        return response()->json($request);
    }
}