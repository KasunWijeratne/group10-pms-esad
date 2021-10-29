import React from 'react'
import { authRoles } from '../../auth/authRoles'

const usersRoutes = [
    {
        path: '/users',
        component: React.lazy(() => import('./index')),
        auth: authRoles.acc_manager,
    },
]

export default usersRoutes
