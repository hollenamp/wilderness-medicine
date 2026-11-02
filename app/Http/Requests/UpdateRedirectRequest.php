<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRedirectRequest extends FormRequest
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
            'from_path' => ['required', 'string', 'max:2048', 'regex:/^\/\S*$/', 'not_regex:/.+\/$/', Rule::unique('redirects', 'from_path')->ignore($this->route('id'))],
            'to_path' => ['required', 'string', 'max:2048'],
            'status_code' => ['required', 'integer', 'in:301,302'],
            'is_active' => ['boolean'],
        ];
    }
}
