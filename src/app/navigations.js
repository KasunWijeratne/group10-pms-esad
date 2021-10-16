import { authRoles } from "./auth/authRoles";

export const navigations = [
    {
        name: 'Requisition list',
        path: '/requisitions',
        icon: 'dashboard',
        auth: authRoles.staff,
    },
    {
        name: 'Materials',
        path: '/materials',
        icon: 'dashboard',
        auth: authRoles.staff,
    },
    {
        name: 'Suppliers',
        path: '/suppliers',
        icon: 'dashboard',
        auth: authRoles.full,
    },
    {
        name: 'Orders',
        path: '/orders',
        icon: 'dashboard',
        auth: authRoles.admin,
    },
]
