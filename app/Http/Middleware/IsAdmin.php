<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class IsAdmin
{
    public function handle($request, Closure $next): Response
    {
        if (Auth::user() &&  Auth::user()->role()->first()->id == 3) {
            return $next($request);
        }

        return redirect('/');
    }
}
