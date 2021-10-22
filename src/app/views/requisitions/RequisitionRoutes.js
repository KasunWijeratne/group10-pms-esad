import React from 'react'
import { authRoles } from '../../auth/authRoles'

const requisitionRoutes = [
    {
        path: '/requisitions',
        component: React.lazy(() => import('./index')),
        auth: authRoles.acc_staff,
    }
]

export default requisitionRoutes;
