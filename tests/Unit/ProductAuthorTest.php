<?php

use App\Models\Product;

it('detects carl weil as author from common catalog patterns', function () {
    expect(Product::detectAuthor('by Carl Weil / Wilderness Medicine Outfitters', null))->toBe('Carl Weil')
        ->and(Product::detectAuthor('WMO WFR/WEMT Text Author: Carl Weil / Wilderness Medicine Outfitters', null))->toBe('Carl Weil')
        ->and(Product::detectAuthor('UNCERTAIN TIMES CARL WEIL & OTHER Experts', null))->toBe('Carl Weil')
        ->and(Product::detectAuthor(null, '<p>by Carl Weil / Wilderness Medicine Outfitters</p>'))->toBe('Carl Weil')
        ->and(Product::detectAuthor(null, null, 'wilderness-ems-book'))->toBe('Carl Weil');
});

it('detects other book authors from catalog copy', function () {
    expect(Product::detectAuthor('Surviving a Wilderness Emergency By Peter Kummerfeldt', null))
        ->toBe('Peter Kummerfeldt')
        ->and(Product::detectAuthor('Wilderness Medicine, Beyond First Aid By William W. Forgey, M.D.', null))
        ->toBe('William W. Forgey')
        ->and(Product::detectAuthor('Medicine for Mountaineering 6th Edition by James Wilkerson', null))
        ->toBe('James Wilkerson')
        ->and(Product::detectAuthor('Hypothermia and Frostbite Edition 2006 by Wilkerson', null))
        ->toBe('James Wilkerson')
        ->and(Product::detectAuthor('Going Higher, 5th Edition by Houston', null))
        ->toBe('Charles Houston')
        ->and(Product::detectAuthor('Ditch Medicine by Coffee SOLD OUT', null))
        ->toBe('Hugh Coffee')
        ->and(Product::detectAuthor(null, null, 'medicinal-plants-mountain-west'))
        ->toBe('Michael Moore')
        ->and(Product::detectAuthor(null, null, 'medicinal-plants-desert-and-canyon-west'))
        ->toBe('Michael Moore');
});

it('does not invent authors for multi-author sets or publisher phrases', function () {
    expect(Product::detectAuthor(
        'Wilderness Medicine, Beyond First Aid 6th Edition by Wm. Forgey',
        null,
        'wfrwemt-book-set',
    ))->toBeNull()
        ->and(Product::detectAuthor('Recommended by his friend Carl and many mountaineers', null))->toBeNull()
        ->and(Product::detectAuthor('earlier printed by ICS -- later by Globe Pequot', null))->toBeNull();
});
