import React from 'react'
import { authRoles } from '../../auth/authRoles'

const orderRoutes = [
    {
        path: '/orders',
        component: React.lazy(() => import('./index')),
        auth: authRoles.admin,
    },
]

export default orderRoutes