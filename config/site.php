<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Public Site Details
    |--------------------------------------------------------------------------
    |
    | Site-wide name, title, description and contact email shared with every
    | public page, and the recipient for contact form submissions. Read them
    | with config('site.*') so they keep working after `config:cache`.
    |
    */

    'name' => env('SITE_NAME', env('APP_NAME', 'Wilderness Medicine Outfitters')),

    'title' => env('SITE_TITLE', 'Wilderness First Responder & Wilderness First Aid Training'),

    'description' => env(
        'SITE_DESCRIPTION',
        'Wilderness medicine training since 1967. Hands-on Wilderness First Aid, Advanced Wilderness First Aid, Wilderness First Responder, Wilderness Emergency Medical Responder, Wilderness First Responder and advanced courses — in person or blended, at your location or ours.'
    ),

    'email' => env('SITE_EMAIL', env('MAIL_FROM_ADDRESS', 'carl@wildernessmedicine.com')),

];
