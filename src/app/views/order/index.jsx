import { Card, Divider, Icon, makeStyles } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import OrderList from './order-list'
import { getOrdersList } from 'app/redux/actions/OrderActions'
import { MatxSearchBox } from 'app/components'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'
import Layout1Settings from 'app/components/MatxLayout/Layout1/Layout1Settings'
import { ThemeProvider } from '@material-ui/core/styles'
import OrderFilters from './order-filters'
import DeleteOrder from './delete-order'

const useStyles = makeStyles({
    'search-bar': {
        position: 'relative',
        height: 65,
    },
    icon: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        bottom: 0,
        left: -15,
        margin: 'auto',
    }
})

const Order = () => {
    const ordersList = useSelector((state) => state.order)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();
    const { settings } = useSettings()
    const topbarTheme = settings.themes[Layout1Settings.topbar.theme]

    const [openDelete, setOpenDelete] = useState(false)
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchText, setSearchText] = useState('');

    const filteredList = useMemo(() => {
        if (activeFilter === 'all') {
            return ordersList;
        }
        return ordersList.filter((order) => order.status === activeFilter)
    }, [activeFilter, ordersList]);

    const searchedList = useMemo(() => {
        if (searchText === '') {
            return filteredList
        }
        return filteredList.filter((item) => item.customer.toLowerCase().includes(searchText) || item.id.includes(searchText));
    }, [filteredList, searchText])

    const fetchOrders = async () => {
        try {
            await dispatch(getOrdersList())
        } catch (e) {
            enqueueSnackbar('Failed to load Orders', { variant: 'error' })
        }
    }

    const handleDialogOpen = () => {
        setOpenDelete(true)
    }

    const handleDialogClose = () => {
        setOpenDelete(false)
    }

    const handleDelete = () => {
        setOpenDelete(false)
    }

    const handleActiveFilter = (active) => {
        setActiveFilter(active);
    }

    useEffect(() => {
        if (!ordersList.length) {
            fetchOrders()
        }
    }, [])

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Order</h1>
            </div>
            <Card elevation={3} className="pt-5 mb-6 orders-list">
                <div className="flex justify-between items-center px-6">
                    <h2 className="card-title">Current Orders</h2>
                </div>
                <div className="p-6">
                    <OrderFilters activeFilter={handleActiveFilter} />
                </div>
                <Divider />
                <div className={clsx('mr-2 ml-10', styles['search-bar'])}>
                    <Icon className={styles.icon}>search</Icon>
                    <ThemeProvider theme={topbarTheme}>
                        <MatxSearchBox isOpen showClose={false} onChange={(e) => { setSearchText(e.target.value) }} />
                    </ThemeProvider>
                </div>
                <Divider />
                <OrderList
                    ordersList={searchedList}
                    handleDialog={handleDialogOpen}
                />
                <DeleteOrder
                    open={openDelete}
                    handleClose={handleDialogClose}
                    handleDelete={handleDelete}
                />
            </Card>
        </div>
    )
}

export default Order
