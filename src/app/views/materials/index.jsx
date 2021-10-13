import { Card, Button } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { getMaterialList } from 'app/redux/actions/MaterialActions'
import MaterialsList from './material-list'
import CreateMaterial from './create-material'
import { getSuppliersList } from 'app/redux/actions/SupplierActions'

const defaultState = {
    name: '',
    suppliers: [],
    date: new Date(),
}

const Materials = () => {
    const [showCreateMaterial, setCreateMaterial] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const materialsList = useSelector((state) => state.material)
    const suppliersList = useSelector((state) => state.supplier)
    const [materialDefaultValues, setMaterialDefaultValues] =
        useState(defaultState)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const fetchMaterials = async () => {
        try {
            await dispatch(getMaterialList())
        } catch (e) {
            enqueueSnackbar('Failed to load materials', { variant: 'error' })
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
        setMaterialDefaultValues(defaultState)
        setIsUpdate(false)
        setCreateMaterial(false)
    }

    const handleEditMaterial = (requisition) => {
        setIsUpdate(true)
        setMaterialDefaultValues(requisition)
        setCreateMaterial(true)
    }

    useEffect(() => {
        fetchMaterials()
        fetchSuppliers()
    }, [])

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Materials</h1>
            </div>
            <Card elevation={3} className="pt-5 mb-6">
                <div className="flex justify-between items-center px-6 mb-3">
                    <h2 className="card-title">Added materials</h2>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={setCreateMaterial}
                    >
                        New
                    </Button>
                </div>
                {showCreateMaterial && (
                    <div className="p-6">
                        <CreateMaterial
                          suppliers={suppliersList}
                          cancel={cancelCreate}
                          defaultValues={materialDefaultValues}
                          isUpdate={isUpdate}
                        />
                    </div>
                )}
                <MaterialsList
                  materialsList={materialsList}
                  editMaterial={handleEditMaterial}
                />
            </Card>
        </div>
    )
}

export default Materials
