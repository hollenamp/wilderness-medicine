<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductCategoryRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', Rule::unique('product_categories', 'name')->ignore($this->route('id'))],
            'slug' => ['nullable', 'string', 'max:255', 'alpha_dash', Rule::unique('product_categories', 'slug')->ignore($this->route('id'))],
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
