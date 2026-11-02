import { AdminPage } from '@/Components/Admin/layout/admin-page';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '@/types';

export default function Edit({
    auth,
    profile,
    mustVerifyEmail,
    status,
}: PageProps<{ profile: User; mustVerifyEmail: boolean; status?: string }>) {
    const isEditingOtherUser = profile.id !== auth.user.id;

    return (
        <AdminPage>
            <Head title={isEditingOtherUser ? `Edit User: ${profile.name}` : 'Profile'} />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">{isEditingOtherUser ? `Edit User: ${profile.name}` : 'Profile'}</h1>
            </div>
            <div className="py-12">
                <div className="w-full space-y-6">
                    <div className="p-4 sm:p-8 bg-card border border-border shadow-sm rounded-admin-lg">
                        <UpdateProfileInformationForm
                            profile={profile}
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    {!isEditingOtherUser && (
                        <div className="p-4 sm:p-8 bg-card border border-border shadow-sm rounded-admin-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-card border border-border shadow-sm rounded-admin-lg">
                        <DeleteUserForm
                            className="max-w-xl"
                            profile={profile}
                            isEditingOtherUser={isEditingOtherUser}
                        />
                    </div>
                </div>
            </div>
                </AdminPage>
    );
}
