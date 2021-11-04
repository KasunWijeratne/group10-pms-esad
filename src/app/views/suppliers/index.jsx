import { Card, Button } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import CreateMaterial from './create-supplier'
import { getSuppliersList } from 'app/redux/actions/SupplierActions'
import SuppliersList from './suppliers-list'
import Loading from 'app/components/MatxLoading/MatxLoading'

const defaultState = {
    name: '',
    suppliers: [],
    date: new Date(),
}

const Suppliers = () => {
    const [showCreateSupplier, setCreateSupplier] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const suppliersList = useSelector((state) => state.supplier)
    const [supplierDefaultValues, setSupplierDefaultValues] =
        useState(defaultState)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)

    const fetchSuppliers = async () => {
        try {
            setLoading(true);
            await dispatch(getSuppliersList())
        } catch (e) {
            enqueueSnackbar('Failed to load suppliers', { variant: 'error' })
        } finally {
            setLoading(false);
        }
    }

    const cancelCreate = () => {
        setSupplierDefaultValues(defaultState)
        setIsUpdate(false)
        setCreateSupplier(false)
    }

    const handleEditSupplier = (requisition) => {
        setIsUpdate(true)
        setSupplierDefaultValues(requisition)
        setCreateSupplier(true)
    }

    const render = () => {
        if (loading) {
            return <Loading />
        }
        return (
            <Card elevation={3} className="pt-5 mb-6">
                <div className="flex justify-between items-center px-6 mb-3">
                    <h2 className="card-title">Added materials</h2>
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
                        <CreateMaterial
                            suppliers={suppliersList}
                            cancel={cancelCreate}
                            defaultValues={supplierDefaultValues}
                            isUpdate={isUpdate}
                        />
                    </div>
                )}
                <SuppliersList
                    suppliersList={suppliersList}
                    editSupplier={handleEditSupplier}
                />
            </Card>
        )
    }

    useEffect(() => {
        if (!suppliersList.length) {
            fetchSuppliers()    
        }
    }, [])

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Suppliers</h1>
            </div>
            { render() }
        </div>
    )
}

export default Suppliers
