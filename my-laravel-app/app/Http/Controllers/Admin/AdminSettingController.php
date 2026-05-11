<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\EmailSetting;
use App\Models\SeoPage;
use App\Models\Script;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
class AdminSettingController extends Controller
{
    public function index()
    {
        $setting = Setting::first();

        return Inertia::render('Admin/Settings/index', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'website_title'    => 'required|string|max:251',
            'strating_keyword' => 'nullable|string',
            'locations'        => 'nullable|string',
            'email'            => 'nullable|email|max:251',
            'phone'            => 'nullable|string|max:251',
            'address'          => 'nullable|string',
            'preloader'        => 'nullable|string|max:251',
            'timing'           => 'nullable|string|max:251',
            'logo'             => 'nullable|string|max:500',
            'favicon'          => 'nullable|string|max:500',
        ]);

        $setting = Setting::first();

        if ($setting) {
            $setting->update($validated);
        } else {
            Setting::create($validated);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }

    public function email()
    {
        $setting = EmailSetting::first();

        return Inertia::render('Admin/Settings/Email', [
            'setting' => $setting,
        ]);
    }

    public function updateEmail(Request $request)
    {
        $validated = $request->validate([
            'driver'       => 'nullable|string|max:50',
            'host'         => 'nullable|string|max:255',
            'port'         => 'nullable|string|max:10',
            'username'     => 'nullable|string|max:255',
            'password'     => 'nullable|string|max:255',
            'encryption'   => 'nullable|string|max:10',
            'from_address' => 'nullable|email|max:255',
            'from_name'    => 'nullable|string|max:255',
            'sendmail'     => 'nullable|string|max:255',
        ]);

        $setting = EmailSetting::first();

        if ($setting) {
            $setting->update($validated);
        } else {
            EmailSetting::create($validated);
        }

        return redirect()->route('admin.settings.email')
            ->with('success', 'Email settings updated successfully.');
    }

    public function testEmail()
    {
        return redirect()->route('admin.settings.email')
            ->with('success', 'Test email sent successfully!');
    }

    public function seo()
    {
        $seoPages = SeoPage::all();
        $scripts = Script::all();

        return Inertia::render('Admin/Settings/SEO', [
            'seoPages' => $seoPages,
            'scripts' => $scripts,
        ]);
    }

    public function scripts()
    {
        $scripts = Script::all();

        return Inertia::render('Admin/Settings/Scripts', [
            'scripts' => $scripts,
        ]);
    }

    public function storeScript(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'script' => 'nullable|string',
            'is_publish' => 'nullable|integer',
            'status' => 'nullable|integer',
        ]);

        Script::create($validated);

        return redirect()->route('admin.settings.scripts')
            ->with('success', 'Script added successfully.');
    }

    public function storeSeo(Request $request)
    {
        $validated = $request->validate([
            'route'               => 'required|string|max:255|unique:seo_pages,route',
            'meta_title'          => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string',
            'meta_keyword'        => 'nullable|string',
            'canonical_url'       => 'nullable|url|max:255',
            'og_title'            => 'nullable|string|max:255',
            'og_description'      => 'nullable|string',
            'og_image'            => 'nullable|string|max:255',
            'twitter_title'       => 'nullable|string|max:255',
            'twitter_description' => 'nullable|string',
            'twitter_image'       => 'nullable|string|max:255',
            'schema_markup'       => 'nullable|string',
        ]);

        SeoPage::create($validated);

        return redirect()->route('admin.settings.seo')
            ->with('success', 'SEO page added successfully.');
    }

    public function updateSeo(Request $request, $id)
    {
        $validated = $request->validate([
            'route'               => 'required|string|max:255|unique:seo_pages,route,'.$id,
            'meta_title'          => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string',
            'meta_keyword'        => 'nullable|string',
            'canonical_url'       => 'nullable|url|max:255',
            'og_title'            => 'nullable|string|max:255',
            'og_description'      => 'nullable|string',
            'og_image'            => 'nullable|string|max:255',
            'twitter_title'       => 'nullable|string|max:255',
            'twitter_description' => 'nullable|string',
            'twitter_image'       => 'nullable|string|max:255',
            'schema_markup'       => 'nullable|string',
        ]);

        $seoPage = SeoPage::findOrFail($id);
        $seoPage->update($validated);

        return redirect()->route('admin.settings.seo')
            ->with('success', 'SEO page updated successfully.');
    }

    public function destroySeo($id)
    {
        $seoPage = SeoPage::findOrFail($id);
        $seoPage->delete();

        return redirect()->route('admin.settings.seo')
            ->with('success', 'SEO page deleted successfully.');
    }

    public function updateScript(Request $request, $id)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'script'     => 'nullable|string',
            'is_publish' => 'nullable|integer',
            'status'     => 'nullable|integer',
        ]);

        $script = Script::findOrFail($id);
        $script->update($validated);

        return redirect()->route('admin.settings.seo')
            ->with('success', 'Script updated successfully.');
    }

    public function userManagement()
    {
        return Inertia::render('Admin/Settings/UserManagement');
    }

    public function addRole()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Settings/AddRole', [
            'roles' => $roles,
        ]);
    }

    public function storeRole(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        Role::create([
            'name' => $validated['name'],
            'guard_name' => 'web',
        ]);

        return redirect()->route('admin.settings.user-management.add-role')
            ->with('success', 'Role added successfully.');
    }

    public function updateRole(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,'.$id,
        ]);

        $role = Role::findOrFail($id);
        $role->update([
            'name' => $validated['name'],
        ]);

        return redirect()->route('admin.settings.user-management.add-role')
            ->with('success', 'Role updated successfully.');
    }

    public function destroyRole($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return redirect()->route('admin.settings.user-management.add-role')
            ->with('success', 'Role deleted successfully.');
    }

    public function addUser()
    {
        return Inertia::render('Admin/Settings/AddUser');
    }

    public function permissions()
    {
        $permissions = Permission::all();

        return Inertia::render('Admin/Settings/Permission', [
            'permissions' => $permissions,
        ]);
    }

    public function plugin()
    {
        return Inertia::render('Admin/Settings/Plugin');
    }

    public function tags()
    {
        return Inertia::render('Admin/Settings/Tags');
    }
}
