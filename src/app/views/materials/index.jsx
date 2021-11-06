import { Card, Button } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { addMaterial, getMaterialData, getMaterialList, GET_MATERIALS_DATA } from 'app/redux/actions/MaterialActions'
import MaterialsList from './material-list'
import CreateMaterial from './create-material'
import { getSuppliersList } from 'app/redux/actions/SupplierActions'
import Loading from '../../components/MatxLoading/MatxLoading'
import ViewMaterial from './view-material'

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
    const [loading, setLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [viewMaterial, setViewMaterial] = useState(false)

    const fetchMaterials = async () => {
        try {
            setLoading(true);
            await dispatch(getMaterialList())
            setLoading(false)
       } catch (e) {
            enqueueSnackbar('Failed to load materials', { variant: 'error' })
            setLoading(false)
        }
    }

    const fetchMaterialData = async (id) => {
        try {
            setEditLoading(true)
            await dispatch(getMaterialData(id))
            setEditLoading(false)
       } catch (e) {
            enqueueSnackbar('Failed to load material details', { variant: 'error' })
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
            type: GET_MATERIALS_DATA,
            payload: defaultState,
        })
        setIsUpdate(false)
        setCreateMaterial(false)
    }

    const handleEditMaterial = (id) => {
        setIsUpdate(true)
         setCreateMaterial(true)
       fetchMaterialData(id)
    }
    const handleViewMaterial = (id) => {
        setViewMaterial(true)
        fetchMaterialData(id)
    }
    const handleNewMaterial = async (payload) => {
        try {
            setLoading(true)
            await dispatch(addMaterial(payload))
            cancelCreate()
            // fetchMaterials()
            enqueueSnackbar('Material added', { variant: 'success' })
        } catch (e) {
            enqueueSnackbar('Material added', { variant: 'success' })
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
                    <h2 className="card-title">Added materials</h2>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        disabled={showCreateMaterial}
                        onClick={setCreateMaterial}
                    >
                        New
                    </Button>
                </div>
                {showCreateMaterial && (
                    <div className="p-6">
                        <CreateMaterial
                            suppliers={suppliersList.list}
                            cancel={cancelCreate}
                            defaultValues={materialsList.active}
                            isUpdate={isUpdate}
                            handleCreate={handleNewMaterial}
                            editLoading={editLoading}
                        />
                    </div>
                )}
                <MaterialsList
                    materialsList={materialsList.list}
                    editMaterial={handleEditMaterial}
                    viewMaterial={handleViewMaterial}
                />
                <ViewMaterial
                    open={viewMaterial}
                    handleClose={setViewMaterial}
                    data={materialsList.active}
                    loading={editLoading}
                />
            </Card>
        )
    }

    useEffect(() => {
        if (!materialsList.list.length) {
            fetchMaterials()
        }
        if (!suppliersList.list.length) {
            fetchSuppliers()
        }
    }, [])

    // useEffect(() => {
    //     debugger;
    //     setMaterialDefaultValues(materialsList.active)
    // }, [materialsList.active])

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Materials</h1>
            </div>
            { render() }
        </div>
    )
}

export default Materials
