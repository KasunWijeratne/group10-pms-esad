import React from 'react'
import { authRoles } from '../../auth/authRoles'

const suppliersRoutes = [
    {
        path: '/suppliers',
        component: React.lazy(() => import('./index')),
        auth: authRoles.acc_manager,
    },
]

export default suppliersRoutes
