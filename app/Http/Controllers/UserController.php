<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * List of users.
     */
    public function list(Request $request): Response
    {
        $users = User::get();

        return Inertia::render('Admin/Users/List', ['users' => $users]);
    }
}
