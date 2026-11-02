<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SyncMenuRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'items' => ['present', 'array'],
            'items.*.id' => ['nullable'],
            'items.*.label' => ['required', 'string', 'max:255'],
            'items.*.url' => ['required', 'string', 'max:2048', 'regex:/^(\/|https?:\/\/|mailto:|tel:)/i'],
            'items.*.parent_id' => ['nullable'],
            'items.*.sort_order' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'items.*.url.regex' => 'The link must be a relative path, or start with http://, https://, mailto:, or tel:.',
        ];
    }
}
