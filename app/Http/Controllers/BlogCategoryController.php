<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogCategoryRequest;
use App\Models\BlogCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
{
    public function list(Request $request): JsonResponse
    {
        $categories = BlogCategory::query()
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return response()->json($categories);
    }

    public function store(StoreBlogCategoryRequest $request): JsonResponse
    {
        $category = BlogCategory::create($request->validated());

        return response()->json($category);
    }
}
