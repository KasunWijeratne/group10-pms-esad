import React from 'react'
import { authRoles } from '../../auth/authRoles'

const materialRoutes = [
    {
        path: '/materials',
        component: React.lazy(() => import('./index')),
        auth: authRoles.staff,
    }
]

export default materialRoutes;
