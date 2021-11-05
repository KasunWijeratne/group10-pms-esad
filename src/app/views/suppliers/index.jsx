import { Card, Button } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import CreateSupplier from './create-supplier'
import { addSupplier, deleteSupplier, getSupplierData, getSuppliersList, GET_SUPPLIER_DATA } from 'app/redux/actions/SupplierActions'
import Loading from '../../components/MatxLoading/MatxLoading'
import ViewMaterial from './view-supplier'
import SuppliersList from './suppliers-list'
import DeleteItem from 'app/components/DeleteItem'

const defaultState = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    date: new Date(),
    email: '',
    phone: '',
}

const Suppliers = () => {
    const [showCreateSupplier, setCreateSupplier] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const suppliersList = useSelector((state) => state.supplier)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)
    const [viewSupplier, setViewSupplier] = useState(false)
    const [confirmDel, setConfirmDel] = useState(false)

    const fetchSupplierData = async (id) => {
        try {
            setEditLoading(true)
            await dispatch(getSupplierData(id))
            setEditLoading(false)
        } catch (e) {
            enqueueSnackbar('Failed to load supplier details', {
                variant: 'error',
            })
            setEditLoading(false)
        }
    }

    const fetchSuppliers = async () => {
        try {
            await dispatch(getSuppliersList())
        } catch (e) {
            enqueueSnackbar('Failed to load suppliers', { variant: 'error' })
        }
    }

    const cancelCreate = () => {
        dispatch({
            type: GET_SUPPLIER_DATA,
            payload: defaultState,
        })
        setIsUpdate(false)
        setCreateSupplier(false)
    }

    const handleEditSupplier = (id) => {
        setIsUpdate(true)
        setCreateSupplier(true)
        fetchSupplierData(id)
    }
    const handleViewSupplier = (id) => {
        setViewSupplier(true)
        fetchSupplierData(id)
    }
    const handleNewSupplier = async (payload) => {
        try {
            setLoading(true)
            await dispatch(addSupplier(payload))
            cancelCreate()
            fetchSuppliers()
        } catch (e) {
            enqueueSnackbar('Failed to load suppliers', { variant: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            await deleteSupplier(id)
            fetchSuppliers()
        } catch (e) {
            enqueueSnackbar('Failed to delete Supplier', { variant: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const render = () => {
        if (loading) {
            return <Loading />
        }
        return (
            <Card elevation={3} className="pt-5 mb-6">
                <div className="flex justify-between items-center px-6 mb-3">
                    <h2 className="card-title">Added Suppliers</h2>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        disabled={showCreateSupplier}
                        onClick={setCreateSupplier}
                    >
                        New
                    </Button>
                </div>
                {showCreateSupplier && (
                    <div className="p-6">
                        <CreateSupplier
                            suppliers={suppliersList}
                            cancel={cancelCreate}
                            defaultValues={suppliersList.active}
                            handleCreate={handleNewSupplier}
                            isUpdate={isUpdate}
                        />
                    </div>
                )}
                <SuppliersList
                    suppliersList={suppliersList.list}
                    editSupplier={handleEditSupplier}
                    viewSupplier={handleViewSupplier}
                    handleDelete={handleDelete}
                />
                <ViewMaterial
                    open={viewSupplier}
                    handleClose={setViewSupplier}
                    data={suppliersList.active}
                    loading={editLoading}
                />
                <DeleteItem open={confirmDel} handleClose={setConfirmDel} />
            </Card>
        )
    }

    useEffect(() => {
        fetchSuppliers()
    }, [])

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Suppliers</h1>
            </div>
            {render()}
        </div>
    )
}

export default Suppliers
