import { authRoles } from "./auth/authRoles";

export const navigations = [
    {
        name: 'Requisition list',
        path: '/requisitions',
        icon: 'dashboard',
        auth: authRoles.acc_staff,
    },
    {
        name: 'Materials',
        path: '/materials',
        icon: 'dashboard',
        auth: authRoles.acc_manager,
    },
    {
        name: 'Suppliers',
        path: '/suppliers',
        icon: 'dashboard',
        auth: authRoles.acc_manager,
    },
    {
        name: 'Orders',
        path: '/orders',
        icon: 'dashboard',
        auth: authRoles.proc_staff,
    },
    {
        name: 'Delivery',
        path: '/delivery',
        icon: 'dashboard',
        auth: authRoles.site_manager,
    },
]
