import React from 'react'
import { Redirect } from 'react-router-dom'

import requisitionsRoutes from './views/requisitions/RequisitionRoutes';
import materialRoutes from './views/materials/MaterialRoutes';
import supplierRoutes from './views/suppliers/SuppliersRoutes';
import orderRoutes from './views/order/OrderRoutes';
import deliveryRoutes from './views/delivery/DeliveryRoutes'
import usersRoutes from './views/users/UsersRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: ({ location }) => {
            const role = location?.state?.user?.role;
            if (role === 'SITE_MANAGER') {
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
    ...deliveryRoutes,
    ...redirectRoute,
    ...usersRoutes,
    ...errorRoute,
]

export default routes
