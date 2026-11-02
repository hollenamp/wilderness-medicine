<?php

use App\Http\Controllers\Auth\GoogleLoginController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CmsUploadController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ImageCategoryController;
use App\Http\Controllers\MailLogController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PageSettingsController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureUserNotSuspended;
use App\Http\Middleware\IsAdmin;
use App\Models\Redirect;
use App\Support\PublicPageData;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Public/Welcome/Page', array_merge(PublicPageData::for('welcome'), [
        'canLogin' => Route::has('admin'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]));
})->name('welcome');

Route::redirect('/about', '/', 301);
Route::get('/gallery', fn () => Inertia::render('Public/Gallery/Page', array_merge(
    PublicPageData::for('gallery'),
    PublicPageData::galleryData(),
)))->name('gallery');
Route::redirect('/photos-page-1', '/gallery', 301);
Route::redirect('/photos-page-2', '/gallery', 301);
Route::redirect('/photos-page-3', '/gallery', 301);
Route::redirect('/reviews', '/wmo-testimonials', 301);
Route::redirect('/faqs', '/faq-page', 301);
Route::redirect('/services', '/', 301);
Route::get('/contact-us', fn () => Inertia::render('Public/Contact/Page', PublicPageData::for('contact')))->name('contact');

Route::get('/expert-witness', fn () => Inertia::render('Public/ExpertWitness/Page', PublicPageData::for('expert-witness')))->name('expert-witness');
Route::get('/expert-page-rock-climbing-gyms-traditional-climbing-and-mountaineering', fn () => Inertia::render('Public/ExpertClimbing/Page', PublicPageData::for('expert-climbing')))->name('expert-climbing');
Route::get('/expert-page-shooting-activities-archery-pistol-shotgun-and-rifle', fn () => Inertia::render('Public/ExpertShooting/Page', PublicPageData::for('expert-shooting')))->name('expert-shooting');
Route::get('/expert-page-horses-livestock-ranches', fn () => Inertia::render('Public/ExpertHorses/Page', PublicPageData::for('expert-horses')))->name('expert-horses');
Route::get('/expert-page-camps-and-guest-ranches', fn () => Inertia::render('Public/ExpertCamps/Page', PublicPageData::for('expert-camps')))->name('expert-camps');
Route::get('/resource', fn () => Inertia::render('Public/Resource/Page', PublicPageData::for('resource')))->name('resource');
Route::redirect('/seen-tv', '/resource', 301);
Route::redirect('/pome', '/resource#pome', 301);
Route::redirect('/pome-evaluation', '/resource#pome', 301);
Route::redirect('/classes/pome', '/resource#pome', 301);
Route::redirect('/classes/pome-evaluation', '/resource#pome', 301);
Route::get('/wfa-bsa', fn () => Inertia::render('Public/DistanceWfaBsa/Page', PublicPageData::for('wfa-bsa')))->name('wfa-bsa');
Route::get('/distance-learning/awfa', fn () => Inertia::render('Public/DistanceAwfa/Page', PublicPageData::for('distance-awfa')))->name('distance-awfa');
Route::get('/distance-learning/converting-awfa-wfr', fn () => Inertia::render('Public/DistanceAwfaToWfr/Page', PublicPageData::for('distance-awfa-wfr')))->name('distance-awfa-wfr');
Route::get('/distance-learning/other-dl-classes', fn () => Inertia::render('Public/DistanceOther/Page', PublicPageData::for('distance-other')))->name('distance-other');
Route::get('/distance-learning/promo', fn () => Inertia::render('Public/DistancePromo/Page', PublicPageData::for('distance-promo')))->name('distance-promo');
Route::get('/epi-course', fn () => Inertia::render('Public/DistanceEpi/Page', PublicPageData::for('epi-course')))->name('epi-course');

Route::get('/why-choose-wmo', fn () => Inertia::render('Public/WhyChooseWmo/Page', PublicPageData::for('why-choose-wmo')))->name('why-choose-wmo');
Route::get('/wmo-testimonials', fn () => Inertia::render('Public/Testimonials/Page', PublicPageData::for('wmo-testimonials')))->name('wmo-testimonials');
Route::get('/director-carl-weil', fn () => Inertia::render('Public/Director/Page', PublicPageData::for('director-carl-weil')))->name('director-carl-weil');
Route::get('/faq-page', fn () => Inertia::render('Public/CommonQuestions/Page', PublicPageData::for('faq-page')))->name('faq-page');
Route::get('/staff-members', fn () => Inertia::render('Public/Instructors/Page', PublicPageData::for('staff-members')))->name('staff-members');
Route::get('/new-students-information', fn () => Inertia::render('Public/NewStudents/Page', PublicPageData::for('new-students-information')))->name('new-students-information');
Route::get('/under-age-21', fn () => Inertia::render('Public/UnderAge21/Page', PublicPageData::for('under-age-21')))->name('under-age-21');
Route::get('/links', fn () => Inertia::render('Public/Links/Page', PublicPageData::for('links')))->name('links');
Route::get('/elizabeth-wildlife', fn () => Inertia::render('Public/ElizabethWildlife/Page', PublicPageData::for('elizabeth-wildlife')))->name('elizabeth-wildlife');
Route::get('/solar-facilities', fn () => Inertia::render('Public/SolarFacilities/Page', PublicPageData::for('solar-facilities')))->name('solar-facilities');
Route::get('/why-paypal', fn () => Inertia::render('Public/WhyPaypal/Page', PublicPageData::for('why-paypal')))->name('why-paypal');
Route::get('/to-register', fn () => Inertia::render('Public/ToRegister/Page', PublicPageData::for('to-register')))->name('to-register');
Route::get('/classes-information', fn () => Inertia::render('Public/ClassesInformation/Page', PublicPageData::for('classes-information')))->name('classes-information');
Route::get('/survival-expo', fn () => Inertia::render('Public/SurvivalExpo/Page', PublicPageData::for('survival-expo')))->name('survival-expo');

Route::get('/blog', [BlogPostController::class, 'publicIndex'])->name('blog.index');
Route::get('/blog/{slug}', [BlogPostController::class, 'publicShow'])->name('blog.show');

Route::get('/classes', [CourseController::class, 'publicIndex'])->name('classes.index');
Route::get('/classes/{slug}', [CourseController::class, 'publicShow'])->name('classes.show');

Route::get('/store', [ProductController::class, 'publicIndex'])->name('store.index');
Route::get('/store/{category}', [ProductController::class, 'publicCategory'])->name('store.category');
Route::get('/product/{slug}', [ProductController::class, 'publicShow'])->name('store.show');

Route::get('/sitemap.xml', [SitemapController::class, 'sitemap'])->name('sitemap');
Route::get('/robots.txt', [SitemapController::class, 'robots'])->name('robots');

Route::post('/api/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('contact.submit');

Route::controller(GoogleLoginController::class)->group(function () {
    Route::get('auth/google', 'redirectToGoogle')->name('auth.google');
    Route::get('auth/google/callback', 'handleGoogleCallback');
});

Route::middleware(['auth', 'verified', EnsureUserNotSuspended::class])->group(function () {
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/admin/dashboard', 'view')->name('admin.dashboard');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name(
        'profile.edit'
    );
    Route::patch('/profile', [ProfileController::class, 'update'])->name(
        'profile.update'
    );
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
        'profile.destroy'
    );

    Route::middleware([IsAdmin::class])->group(function () {
        Route::controller(SettingsController::class)->group(function () {
            Route::get('/admin/settings/theme', 'theme')->name('admin.settings.theme');
            Route::get('/admin/settings/business', 'business')->name('admin.settings.business');
            Route::patch('/admin/settings/business', 'updateBusiness')->name('admin.settings.business.update');
        });

        Route::controller(PageSettingsController::class)->group(function () {
            Route::get('/admin/settings/pages', 'index')->name('admin.settings.pages');
            Route::patch('/admin/settings/pages/{id}', 'update')->name('admin.settings.pages.update');
        });

        Route::controller(UserController::class)->group(function () {
            Route::get('/admin/users', 'list')->name('admin.users.list');
        });

        Route::controller(ProfileController::class)->group(function () {
            Route::get('/admin/profile/{id}', 'edit')->name(
                'admin.profile.edit'
            );
            Route::patch('/admin/profile/{id}', 'update')->name(
                'admin.profile.update'
            );
            Route::delete('/admin/profile/{id}', 'destroy')->name(
                'admin.profile.destroy'
            );
        });

        Route::controller(PageController::class)->group(function () {
            Route::get('/admin/pages', 'list')->name('admin.pages.list');
            Route::get('/admin/pages/{id}', 'edit')->name('admin.pages.edit');
            Route::patch('/admin/pages/{id}', 'update')->name('admin.pages.update');
        });

        Route::post('/admin/cms/uploads', [CmsUploadController::class, 'store'])->name('admin.cms.uploads.store');

        Route::controller(GalleryController::class)->group(function () {
            Route::get('/admin/galleries', 'list')->name('admin.galleries.list');
            Route::get('/admin/galleries/create', 'create')->name('admin.galleries.create');
            Route::post('/admin/galleries', 'store')->name('admin.galleries.store');
            Route::get('/admin/galleries/{id}', 'edit')->name('admin.galleries.edit');
            Route::patch('/admin/galleries/{id}', 'update')->name('admin.galleries.update');
            Route::delete('/admin/galleries/{id}', 'destroy')->name('admin.galleries.destroy');
            Route::post('/admin/galleries/{id}/media', 'addMedia')->name('admin.galleries.media.store');
            Route::delete('/admin/galleries/{id}/media/{mediaId}', 'removeMedia')->name('admin.galleries.media.destroy');
            Route::patch('/admin/galleries/{id}/media/reorder', 'reorder')->name('admin.galleries.media.reorder');
        });

        Route::controller(ImageCategoryController::class)->group(function () {
            Route::get('/admin/image-categories', 'list')->name('admin.image-categories.list');
            Route::get('/admin/image-categories/create', 'create')->name('admin.image-categories.create');
            Route::post('/admin/image-categories', 'store')->name('admin.image-categories.store');
            Route::get('/admin/image-categories/{id}', 'edit')->name('admin.image-categories.edit');
            Route::patch('/admin/image-categories/{id}', 'update')->name('admin.image-categories.update');
            Route::delete('/admin/image-categories/{id}', 'destroy')->name('admin.image-categories.destroy');
        });

        Route::controller(CategoryController::class)->group(function () {
            Route::get('/admin/api/categories', 'list')->name('admin.api.categories.list');
            Route::post('/admin/api/categories', 'store')->name('admin.api.categories.store');
            Route::patch('/admin/api/categories/{id}', 'update')->name('admin.api.categories.update');
            Route::delete('/admin/api/categories/{id}', 'destroy')->name('admin.api.categories.destroy');
        });

        Route::controller(CourseController::class)->group(function () {
            Route::get('/admin/classes', 'list')->name('admin.classes.list');
            Route::get('/admin/classes/create', 'create')->name('admin.classes.create');
            Route::get('/admin/classes/trash', 'trash')->name('admin.classes.trash');
            Route::post('/admin/classes', 'store')->name('admin.classes.store');
            Route::get('/admin/classes/{id}', 'edit')->name('admin.classes.edit');
            Route::patch('/admin/classes/{id}', 'update')->name('admin.classes.update');
            Route::delete('/admin/classes/{id}', 'destroy')->name('admin.classes.destroy');
            Route::post('/admin/classes/{id}/restore', 'restore')->name('admin.classes.restore');
            Route::delete('/admin/classes/{id}/force', 'forceDestroy')->name('admin.classes.force-destroy');
        });

        Route::controller(BlogPostController::class)->group(function () {
            Route::get('/admin/blog', 'list')->name('admin.blog.list');
            Route::get('/admin/blog/create', 'create')->name('admin.blog.create');
            Route::get('/admin/blog/trash', 'trash')->name('admin.blog.trash');
            Route::post('/admin/blog', 'store')->name('admin.blog.store');
            Route::get('/admin/blog/{id}', 'edit')->name('admin.blog.edit');
            Route::patch('/admin/blog/{id}', 'update')->name('admin.blog.update');
            Route::delete('/admin/blog/{id}', 'destroy')->name('admin.blog.destroy');
            Route::post('/admin/blog/{id}/restore', 'restore')->name('admin.blog.restore');
            Route::delete('/admin/blog/{id}/force', 'forceDestroy')->name('admin.blog.force-destroy');
        });

        Route::controller(ProductController::class)->group(function () {
            Route::get('/admin/store/products', 'list')->name('admin.store.products.list');
            Route::get('/admin/store/products/create', 'create')->name('admin.store.products.create');
            Route::get('/admin/store/products/trash', 'trash')->name('admin.store.products.trash');
            Route::post('/admin/store/products', 'store')->name('admin.store.products.store');
            Route::get('/admin/store/products/{id}', 'edit')->name('admin.store.products.edit');
            Route::patch('/admin/store/products/{id}', 'update')->name('admin.store.products.update');
            Route::delete('/admin/store/products/{id}', 'destroy')->name('admin.store.products.destroy');
            Route::post('/admin/store/products/{id}/restore', 'restore')->name('admin.store.products.restore');
            Route::delete('/admin/store/products/{id}/force', 'forceDestroy')->name('admin.store.products.force-destroy');
        });

        Route::controller(ProductCategoryController::class)->group(function () {
            Route::get('/admin/store/categories', 'list')->name('admin.store.categories.list');
            Route::get('/admin/store/categories/create', 'create')->name('admin.store.categories.create');
            Route::post('/admin/store/categories', 'store')->name('admin.store.categories.store');
            Route::get('/admin/store/categories/{id}', 'edit')->name('admin.store.categories.edit');
            Route::patch('/admin/store/categories/{id}', 'update')->name('admin.store.categories.update');
            Route::delete('/admin/store/categories/{id}', 'destroy')->name('admin.store.categories.destroy');
            Route::get('/admin/api/product-categories', 'apiList')->name('admin.api.product-categories.list');
            Route::post('/admin/api/product-categories', 'store')->name('admin.api.product-categories.store');
        });

        Route::controller(RedirectController::class)->group(function () {
            Route::get('/admin/redirects', 'list')->name('admin.redirects.list');
            Route::get('/admin/redirects/create', 'create')->name('admin.redirects.create');
            Route::post('/admin/redirects', 'store')->name('admin.redirects.store');
            Route::get('/admin/redirects/{id}', 'edit')->name('admin.redirects.edit');
            Route::patch('/admin/redirects/{id}', 'update')->name('admin.redirects.update');
            Route::delete('/admin/redirects/{id}', 'destroy')->name('admin.redirects.destroy');
        });

        Route::controller(BlogCategoryController::class)->group(function () {
            Route::get('/admin/api/blog-categories', 'list')->name('admin.api.blog-categories.list');
            Route::post('/admin/api/blog-categories', 'store')->name('admin.api.blog-categories.store');
        });

        Route::controller(MenuController::class)->group(function () {
            Route::get('/admin/menus', 'index')->name('admin.menus.index');
            Route::put('/admin/menus/{id}/sync', 'sync')->name('admin.menus.sync');
            Route::post('/admin/menus/{id}/reset', 'reset')->name('admin.menus.reset');
        });

        Route::controller(MediaController::class)->group(function () {
            Route::get('/admin/media', 'index')->name('admin.media.index');
            Route::get('/admin/api/media', 'list')->name('admin.api.media.list');
            Route::post('/admin/media', 'store')->name('admin.media.store');
            Route::patch('/admin/media/{id}/categories', 'updateCategories')->name('admin.media.categories.update');
            Route::delete('/admin/media/{id}', 'destroy')->name('admin.media.destroy');
        });

        Route::controller(MailLogController::class)->group(function () {
            Route::get('/admin/mail-log', 'list')->name('admin.mail-log.list');
            Route::get('/admin/mail-log/settings', 'settings')->name('admin.mail-log.settings');
            Route::patch('/admin/mail-log/settings', 'updateSettings')->name('admin.mail-log.settings.update');
            Route::get('/admin/mail-log/{id}', 'show')->name('admin.mail-log.show');
            Route::delete('/admin/mail-log/{id}', 'destroy')->name('admin.mail-log.destroy');
            Route::post('/admin/mail-log/{id}/forward', 'forward')->name('admin.mail-log.forward');
        });
    });
});

require __DIR__.'/auth.php';

Route::fallback(function (Request $request) {
    $redirect = Redirect::where('from_path', '/'.ltrim($request->path(), '/'))
        ->where('is_active', true)
        ->first();

    if ($redirect) {
        return redirect($redirect->to_path, $redirect->status_code);
    }

    abort(404);
});
