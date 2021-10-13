import React from 'react'
import { authRoles } from '../../auth/authRoles'

const requisitionRoutes = [
    {
        path: '/requisitions',
        component: React.lazy(() => import('./index')),
        auth: authRoles.staff,
    }
]

export default requisitionRoutes;
