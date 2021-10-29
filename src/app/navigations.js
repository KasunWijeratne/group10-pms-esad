import { authRoles } from "./auth/authRoles";

export const navigations = [
    {
        name: 'Orders list',
        path: '/requisitions',
        icon: 'dvr',
        auth: authRoles.acc_staff,
    },
    {
        name: 'Materials',
        path: '/materials',
        icon: 'extension',
        auth: authRoles.acc_manager,
    },
    {
        name: 'Suppliers',
        path: '/suppliers',
        icon: 'assignment_ind',
        auth: authRoles.acc_manager,
    },
    // {
    //     name: 'Orders',
    //     path: '/orders',
    //     icon: 'dashboard',
    //     auth: authRoles.proc_staff,
    // },
    {
        name: 'Users',
        path: '/users',
        icon: 'group',
        auth: authRoles.acc_manager,
    },
    {
        name: 'Delivery',
        path: '/delivery',
        icon: 'dashboard',
        auth: authRoles.site_manager,
    },
]
