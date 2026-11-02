<?php

namespace App\Support;

use Carbon\CarbonInterface;

class PublishedAt
{
    /**
     * Work out the published_at value to save from an admin edit form.
     *
     * The forms send a date-only value, so when it's the same calendar date as
     * the stored timestamp we keep the stored time instead of resetting it to
     * midnight. A blank value on a published record defaults to now.
     */
    public static function resolve(string $status, mixed $submitted, ?CarbonInterface $current = null): mixed
    {
        if ($submitted === null || $submitted === '') {
            return $status === 'published' ? now() : null;
        }

        if ($current !== null && $submitted === $current->toDateString()) {
            return $current;
        }

        return $submitted;
    }
}
