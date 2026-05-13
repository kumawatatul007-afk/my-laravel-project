<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminPortfolioController;
use App\Http\Controllers\Admin\AdminBlogController;
use App\Http\Controllers\Admin\AdminMessageController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\AdminBlogCommentController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminNewsletterController;
use App\Http\Controllers\Admin\AdminServiceController;
use App\Http\Controllers\SitemapController;

// ─── Public / Portfolio Site ────────────────────────────────────────────────

Route::get('/sitemap.xml', [SitemapController::class, 'index']);
Route::get('/robots.txt', [SitemapController::class, 'robots']);

Route::get('/', [PublicController::class, 'home']);
Route::get('/dashboard', [PublicController::class, 'home']);
Route::get('/about', fn () => Inertia::render('About/index'));
Route::get('/blog', [PublicController::class, 'blog']);
Route::get('/blog/{slug}', [PublicController::class, 'blogDetail']);
Route::get('/blog/{slug}/sidebar', [PublicController::class, 'blogDetailSidebar']);
Route::get('/contact', fn () => Inertia::render('Contact/index'));
Route::get('/portfolio/list', [PublicController::class, 'portfolioList']);
Route::get('/portfolio/{id}', [PublicController::class, 'portfolioDetail']);
Route::get('/portfolio', [PublicController::class, 'portfolio']);
Route::get('/services', [PublicController::class, 'services']);
Route::get('/services/{slug}', [PublicController::class, 'serviceDetail']);
Route::get('/web-developer-jaipur', fn () => Inertia::render('LocalLanding/WebDeveloperJaipur'));

// Contact form submission
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// ─── Auth ────────────────────────────────────────────────────────────────────

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// ─── Users (legacy) ──────────────────────────────────────────────────────────

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');

// ─── Admin Panel ─────────────────────────────────────────────────────────────

// Admin Login (no middleware)
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.post');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
});

// Admin Protected Routes
Route::prefix('admin')->name('admin.')->middleware(\App\Http\Middleware\AdminMiddleware::class)->group(function () {

    // Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Users CRUD
    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [AdminUserController::class, 'create'])->name('users.create');
    Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');

    // Portfolio CRUD
    Route::get('/portfolio', [AdminPortfolioController::class, 'index'])->name('portfolio.index');
    Route::get('/portfolio/create', [AdminPortfolioController::class, 'create'])->name('portfolio.create');
    Route::post('/portfolio', [AdminPortfolioController::class, 'store'])->name('portfolio.store');
    Route::get('/portfolio/{portfolio}/edit', [AdminPortfolioController::class, 'edit'])->name('portfolio.edit');
    Route::put('/portfolio/{portfolio}', [AdminPortfolioController::class, 'update'])->name('portfolio.update');
    Route::delete('/portfolio/{portfolio}', [AdminPortfolioController::class, 'destroy'])->name('portfolio.destroy');

    // Blog CRUD
    Route::get('/blog', [AdminBlogController::class, 'index'])->name('blog.index');
    Route::get('/blog/create', [AdminBlogController::class, 'create'])->name('blog.create');
    Route::post('/blog', [AdminBlogController::class, 'store'])->name('blog.store');
    Route::get('/blog/{blog}/edit', [AdminBlogController::class, 'edit'])->name('blog.edit');
    Route::put('/blog/{blog}', [AdminBlogController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{blog}', [AdminBlogController::class, 'destroy'])->name('blog.destroy');

    // Categories
    Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories.index');

    // Settings
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings.index');
    Route::put('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
    Route::get('/settings/email', [AdminSettingController::class, 'email'])->name('settings.email');
    Route::put('/settings/email', [AdminSettingController::class, 'updateEmail'])->name('settings.email.update');
    Route::post('/settings/email/test', [AdminSettingController::class, 'testEmail'])->name('settings.email.test');
    Route::get('/settings/scripts', [AdminSettingController::class, 'scripts'])->name('settings.scripts');
    Route::post('/settings/scripts', [AdminSettingController::class, 'storeScript'])->name('settings.scripts.store');
    Route::put('/settings/script/{id}', [AdminSettingController::class, 'updateScript'])->name('settings.script.update');
    Route::get('/settings/user-management', [AdminSettingController::class, 'userManagement'])->name('settings.user-management');
    Route::get('/settings/user-management/add-role', [AdminSettingController::class, 'addRole'])->name('settings.user-management.add-role');
    Route::post('/settings/user-management/add-role', [AdminSettingController::class, 'storeRole'])->name('settings.user-management.add-role.store');
    Route::put('/settings/user-management/add-role/{id}', [AdminSettingController::class, 'updateRole'])->name('settings.user-management.add-role.update');
    Route::delete('/settings/user-management/add-role/{id}', [AdminSettingController::class, 'destroyRole'])->name('settings.user-management.add-role.destroy');
    Route::get('/settings/user-management/add-user', [AdminSettingController::class, 'addUser'])->name('settings.user-management.add-user');
    Route::get('/settings/user-management/permission', [AdminSettingController::class, 'permissions'])->name('settings.user-management.permission');
    Route::get('/settings/plugin', [AdminSettingController::class, 'plugin'])->name('settings.plugin');
    Route::get('/settings/tags', [AdminSettingController::class, 'tags'])->name('settings.tags');

    // Gallery
    Route::get('/gallery', [AdminGalleryController::class, 'index'])->name('gallery.index');
    Route::post('/gallery', [AdminGalleryController::class, 'store'])->name('gallery.store');
    Route::get('/comments', [AdminBlogCommentController::class, 'index'])->name('comments.index');
    Route::delete('/comments/{comment}', [AdminBlogCommentController::class, 'destroy'])->name('comments.destroy');

    // Messages
    Route::get('/messages', [AdminMessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [AdminMessageController::class, 'show'])->name('messages.show');
    Route::patch('/messages/{message}/read', [AdminMessageController::class, 'markRead'])->name('messages.read');
    Route::delete('/messages/{message}', [AdminMessageController::class, 'destroy'])->name('messages.destroy');

    // Newsletters
    Route::get('/newsletters', [AdminNewsletterController::class, 'index'])->name('newsletters.index');
    Route::delete('/newsletters/{newsletter}', [AdminNewsletterController::class, 'destroy'])->name('newsletters.destroy');

    // Services CRUD
    Route::get('/services', [AdminServiceController::class, 'index'])->name('services.index');
    Route::get('/services/create', [AdminServiceController::class, 'create'])->name('services.create');
    Route::post('/services', [AdminServiceController::class, 'store'])->name('services.store');
    Route::get('/services/{service}/edit', [AdminServiceController::class, 'edit'])->name('services.edit');
    Route::put('/services/{service}', [AdminServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [AdminServiceController::class, 'destroy'])->name('services.destroy');
});
