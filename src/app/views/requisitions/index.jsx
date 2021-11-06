import { Card, Button, Divider, Icon } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useMemo, useState } from 'react'
import CreateRequisition from './create-requisition'
import RequisitionList from './requisition-list'
import { addRequisition, APPROVE_ORDER, getRequisitionsList } from '../../redux/actions/RequisitionActions'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import ViewRequisition from './view-requisition'
import { MatxSearchBox } from 'app/components'
import { ThemeProvider } from '@material-ui/core/styles'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import RequisitionFilters from './requisitions-filters'
import useSettings from 'app/hooks/useSettings'
import Layout1Settings from 'app/components/MatxLayout/Layout1/Layout1Settings'
import Loading from 'app/components/MatxLoading/MatxLoading'
import { getMaterialList } from 'app/redux/actions/MaterialActions'
import { getSuppliersList } from 'app/redux/actions/SupplierActions'

export const defaultState = {
    site: '',
    priority: '',
    material: '',
    supplier: '',
    quantity: 1,
    date: new Date(),
}

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
    },
})

const Requisition = () => {
    const [showCreateRequisition, setCreateRequisition] = useState(false)
    const materials = useSelector((state) => state.material)
    const suppliers = useSelector((state) => state.supplier)
    const [sites, setSites] = useState([
        {
            label: 'Colombo',
            value: 'col',
        },
        {
            label: 'Kandy',
            value: 'kan',
        },
    ])
    const [priority, setPriority] = useState([
        {
            label: 'High',
            value: 'high',
        },
        {
            label: 'Medium',
            value: 'medium',
        },
        {
            label: 'Low',
            value: 'low',
        },
    ])
    const [viewRequisition, setViewRequisition] = useState(false)
    const [viewingReq, setViewingReq] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    const requisitionsList = useSelector((state) => state.requisition)
    debugger;
    const [reqItemDefaultValues, setReqItemDefaultValues] =
        useState(defaultState)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchText, setSearchText] = useState('')
    const styles = useStyles()
    const { settings } = useSettings()
    const topbarTheme = settings.themes[Layout1Settings.topbar.theme]
    const [loading, setLoading] = useState(false)

    const filteredList = useMemo(() => {
        if (activeFilter === 'all') {
            return requisitionsList
        }
        return requisitionsList.filter((order) => order.status === activeFilter)
    }, [activeFilter, requisitionsList])

    const searchedList = useMemo(() => {
        if (searchText === '') {
            return filteredList
        }
        return filteredList.filter(
            (item) =>
                item.site.toLowerCase().includes(searchText.toLowerCase()) ||
                item.price.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    }, [filteredList, searchText])

    const fetchRequisitions = async () => {
        try {
            setLoading(true);
            await dispatch(getRequisitionsList())
        } catch (e) {
            enqueueSnackbar('Failed to load requisitions', { variant: 'error' })
        } finally {
            setLoading(false);
        }
    }

    const fetchMaterials = async () => {
        try {
            setLoading(true)
            await dispatch(getMaterialList())
        } catch (e) {
            enqueueSnackbar('Failed to load materials', {
                variant: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchSuppliers = async () => {
        try {
            await dispatch(getSuppliersList())
        } catch (e) {
            enqueueSnackbar('Failed to load suppliers', {
                variant: 'error',
            })
        }
    }

    const getTotal = useMemo(() => {
        let tot = 0;
        requisitionsList.forEach((req) => {
            tot += req.price
        })
        return tot;
    }, [requisitionsList])

    const cancelCreate = () => {
        setReqItemDefaultValues(defaultState)
        setIsUpdate(false)
        setCreateRequisition(false)
    }

    const handleAddClick = () => {
        cancelCreate()
        setCreateRequisition(true)
    }

    const handleEditRequisition = (requisition) => {
        setIsUpdate(true)
        setReqItemDefaultValues(requisition)
        setCreateRequisition(true)
    }

    const handleRequistionView = (req) => {
        setViewingReq(req)
        setViewRequisition(true)
    }

    const handleActiveFilter = (active) => {
        setActiveFilter(active)
    }

    const handleNewOrder = async (payload) => {
        try {
            setLoading(true)
            await dispatch(addRequisition(payload))
            cancelCreate()
            // fetchMaterials()
            enqueueSnackbar('Order added', { variant: 'success' })
        } catch (e) {
            enqueueSnackbar('Order added', { variant: 'success' })
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (id) => {
        const items = [...requisitionsList]
        const newOrders = items.map((req) => {
            if(req.id === id) {
                req.status = 'approved'
            }
            return req;
        })
        await dispatch({
            type: APPROVE_ORDER,
            payload: newOrders,
        })
        setViewingReq(null)
        setViewRequisition(false)
    }

    const handleReject = async (id, reason) => {
        const items = [...requisitionsList]
        const newOrders = items.map((req) => {
            if (req.id === id) {
                req.status = 'declined'
                req['reason'] = reason
            }
            return req
        })
        await dispatch({
            type: APPROVE_ORDER,
            payload: newOrders,
        })
        setViewingReq(null)
        setViewRequisition(false)
    }

    const render = () => {
        if (loading) {
            return <Loading />
        }
        return (
            <Card elevation={3} className="pt-5 mb-6">
                <div className="flex justify-between items-center px-6 mb-3">
                    <h2 className="card-title">Created orders</h2>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleAddClick}
                    >
                        New
                    </Button>
                </div>
                {showCreateRequisition && (
                    <div className="p-6">
                        <CreateRequisition
                            sites={sites}
                            suppliers={suppliers.list}
                            materials={materials.list}
                            priority={priority}
                            cancel={cancelCreate}
                            defaultValues={[reqItemDefaultValues]}
                            isUpdate={isUpdate}
                            handleCreate={handleNewOrder}
                            listLength={requisitionsList.length + 1}
                        />
                    </div>
                )}
                <div className="p-6">
                    <RequisitionFilters activeFilter={handleActiveFilter} />
                </div>
                <Divider />
                <div className={clsx('mr-2 ml-10', styles['search-bar'])}>
                    <Icon className={styles.icon}>search</Icon>
                    <ThemeProvider theme={topbarTheme}>
                        <MatxSearchBox
                            isOpen
                            showClose={false}
                            onChange={(e) => {
                                setSearchText(e.target.value)
                            }}
                        />
                    </ThemeProvider>
                </div>
                <Divider />
                <RequisitionList
                    requisitionsList={searchedList}
                    editRequisition={handleEditRequisition}
                    viewRequisition={handleRequistionView}
                />
                <ViewRequisition
                    open={viewRequisition}
                    handleClose={setViewRequisition}
                    data={viewingReq}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                />
            </Card>
        )
    }

    useEffect(() => {
        if (!requisitionsList.length) {
            fetchRequisitions()
        }
        if (!materials.list.length) {
fetchMaterials()
        }
        if (!suppliers.list.length) {
        fetchSuppliers()
        }
        
    }, [])

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Orders</h1>
                <h2 className="text-muted">Total: {getTotal}</h2>
            </div>
            { render() }
        </div>
    )
}

export default Requisition
