import React from 'react'
import { authRoles } from '../../auth/authRoles'

const deliveryRoutes = [
    {
        path: '/delivery',
        component: React.lazy(() => import('./index')),
        auth: authRoles.proc_staff,
    }
]

export default deliveryRoutes;
