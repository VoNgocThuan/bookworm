<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // $user = User::where('email', $request->email)->first();
        // if (!$user || !Hash::check($request->password, $user->password)) {
        //     return response([
        //         'message' => ['These credentials do not match our records.']
        //     ], 404);
        // }

        // $token = $user->createToken('my-app-token')->plainTextToken;

        // $response = [
        //     'user' => $user,
        //     'token' => $token
        // ];

        // return response($response, 201);

        // if (!Auth::attempt(request()->only('email', 'password'))) {
        //     return response()->json([
        //         'message' => 'Login failed'
        //     ]);
        // }

        // return response()->json([
        //     'message' => 'Login successful'
        // ]);


        if (Auth::guard()->attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();

            return response()->json([
                'message' => 'Login successful'
            ]);
        }

        return response()->json(['error' => 'Invalid credentials']);
    }
}
