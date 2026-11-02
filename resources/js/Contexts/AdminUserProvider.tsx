import { createContext, useContext } from 'react';
import { User } from '@/types';

const AdminUserContext = createContext<User | null>(null);

export function AdminUserProvider({ user, children }: { user: User; children: React.ReactNode }) {
    return <AdminUserContext.Provider value={user}>{children}</AdminUserContext.Provider>;
}

export function useAdminUser() {
    const user = useContext(AdminUserContext);
    if (!user) {
        throw new Error('useAdminUser must be used within AdminUserProvider');
    }
    return user;
}
