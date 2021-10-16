import React from 'react'
import { Redirect } from 'react-router-dom'

import requisitionsRoutes from './views/requisitions/RequisitionRoutes';
import materialRoutes from './views/materials/MaterialRoutes';
import supplierRoutes from './views/suppliers/SuppliersRoutes';
import orderRoutes from './views/order/OrderRoutes';

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: ({ location }) => {
            const role = location?.state?.user?.role;
            if (role === 'ADMIN') {
                return <Redirect to="/orders" />
            } else {
                return <Redirect to="/requisitions" />
            }
        },
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
    ...supplierRoutes,
    ...orderRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
