<?php

namespace App\Http\Requests;

use App\Rules\UniqueSlug;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required', 'string', 'max:255', 'unique:product_categories,name',
                // Without a slug the controller derives one from the name, so check that one.
                Rule::when(blank($this->input('slug')), [new UniqueSlug('product_categories')]),
            ],
            'slug' => ['nullable', 'string', 'max:255', 'alpha_dash', 'unique:product_categories,slug'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'A category name is required.',
            'name.unique' => 'A category with that name already exists.',
            'slug.unique' => 'That slug is already in use by another category.',
        ];
    }
}
