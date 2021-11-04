import { Card, Button, Divider, Icon } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useMemo, useState } from 'react'
import CreateRequisition from './create-requisition'
import RequisitionList from './requisition-list'
import { getRequisitionsList } from '../../redux/actions/RequisitionActions'
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
    const [materials, setMaterials] = useState([
        {
            label: 'Material1',
            value: 'mat1',
        },
        {
            label: 'Material2',
            value: 'mat2',
        },
    ])
    const [suppliers, setSuppliers] = useState([
        {
            label: 'Supplier1',
            value: 'sup1',
        },
        {
            label: 'Supplier2',
            value: 'sup2',
        },
    ])
    const [priority, setPriority] = useState([
        {
            label: 'High',
            value: 'high',
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

    const cancelCreate = () => {
        setReqItemDefaultValues(defaultState)
        setIsUpdate(false)
        setCreateRequisition(false)
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
                        onClick={setCreateRequisition}
                    >
                        New
                    </Button>
                </div>
                {showCreateRequisition && (
                    <div className="p-6">
                        <CreateRequisition
                            sites={sites}
                            suppliers={suppliers}
                            materials={materials}
                            priority={priority}
                            cancel={cancelCreate}
                            defaultValues={[reqItemDefaultValues]}
                            isUpdate={isUpdate}
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
                />
            </Card>
        )
    }

    useEffect(() => {
        fetchRequisitions()
    }, [])

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Orders</h1>
                <h2 className="text-muted">Total: 20,000</h2>
            </div>
            { render() }
        </div>
    )
}

export default Requisition
