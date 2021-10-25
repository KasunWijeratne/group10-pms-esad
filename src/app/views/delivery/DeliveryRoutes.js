import React from 'react'
import { authRoles } from '../../auth/authRoles'

const deliveryRoutes = [
    {
        path: '/delivery',
        component: React.lazy(() => import('./index')),
        auth: authRoles.site_manager,
    }
]

export default deliveryRoutes;
