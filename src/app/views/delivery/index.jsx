import { Card, Button } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { getDeliveryList } from 'app/redux/actions/DeliveryActions'
import CreateDelivery from './create-delivery'
import DeliveryList from './delivery-list'
import ViewDelivery from './view-delivery'
import { getOrdersList } from 'app/redux/actions/OrderActions';

export const defaultState = {
    purchaseOrder: '',
    quantity: 1,
    date: new Date(),
}

const Delivery = () => {
    const [showCreateDelivery, setCreateDelivery] = useState(false)
    const [viewDelivery, setViewDelivery] = useState(false);
    const [viewingDelivery, setViewingDelivery] = useState(null)
    const deliveriesList = useSelector((state) => state.delivery);
    const orders = useSelector((state) => state.order)
    const [deliveryItemDefaultValues, setDeliveryItemDefaultValues] = useState(defaultState);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const fetchDeliveries = async () => {
        try {
            await dispatch(getDeliveryList());
        } catch (e) {
            enqueueSnackbar('Failed to load requisitions', { variant: 'error' })
        }   
    }

    const fetchOrders = async () => {
        try {
            await dispatch(getOrdersList())
        } catch (e) {
            enqueueSnackbar('Failed to load Orders', { variant: 'error' })
        }
    }

    const cancelCreate = () => {
        setDeliveryItemDefaultValues(defaultState);
        setCreateDelivery(false);
    }

    const handleDeliveryView = (req) => {
        setViewingDelivery(req);
        setViewDelivery(true);
    }

    useEffect(() => {
        fetchDeliveries();
        fetchOrders()
    }, []);

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Delivery</h1>
                <h2 className="text-muted">Total: 20,000</h2>
            </div>
            <Card elevation={3} className="pt-5 mb-6">
                <div className="flex justify-between items-center px-6 mb-3">
                    <h2 className="card-title">Created delivereis</h2>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={setCreateDelivery}
                    >
                        New
                    </Button>
                </div>
                {showCreateDelivery && (
                    <div className="p-6">
                        <CreateDelivery
                            ordersList={orders}
                            cancel={cancelCreate}
                            defaultValues={[deliveryItemDefaultValues]}
                        />
                    </div>
                )}
                <DeliveryList
                    deliveriesList={deliveriesList}
                    viewDelivery={handleDeliveryView}
                />
                <ViewDelivery
                    open={viewDelivery}
                    handleClose={setViewDelivery}
                    data={viewingDelivery}
                />
            </Card>
        </div>
    )
}

export default Delivery
