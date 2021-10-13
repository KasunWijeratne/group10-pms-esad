import React from 'react'
import { Redirect } from 'react-router-dom'

import requisitionsRoutes from './views/requisitions/RequisitionRoutes';
import materialRoutes from './views/materials/MaterialRoutes';

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/requisitions" />,
    },
]
const staffRoutes = [
    {
        path: '/requisitions',
        exact: true,
        component: () => <Redirect to="/requisitions" />,
    },{
        path: '/materials',
        exact: true,
        component: () => <Redirect to="/materials" />,
    },{
        path: '/suppliers',
        exact: true,
        component: () => <Redirect to="/suppliers" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...requisitionsRoutes,
    ...materialRoutes,
    ...redirectRoute,
    ...staffRoutes,
    ...errorRoute,
]

export default routes
