<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Translation\PotentiallyTranslatedString;

/**
 * Fails when the slug derived from the value (Str::slug) is already used by
 * another row, so names like "Foo Bar" and "Foo-Bar" can't collide on the
 * slug unique index.
 */
class UniqueSlug implements ValidationRule
{
    public function __construct(
        private string $table,
        private mixed $ignoreId = null,
        private string $column = 'slug',
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value)) {
            return;
        }

        $exists = DB::table($this->table)
            ->where($this->column, Str::slug($value))
            ->when($this->ignoreId !== null, fn ($query) => $query->where('id', '!=', $this->ignoreId))
            ->exists();

        if ($exists) {
            $fail('A category with a similar name already exists.');
        }
    }
}
