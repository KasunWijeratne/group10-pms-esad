import { Card, Button } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import CreateRequisition from './create-reaquisition'
import RequisitionList from './requisition-list'
import { getRequisitionsList } from '../../redux/actions/RequisitionActions'
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'

const defaultState = {
    site: '',
    priority: '',
    material: '',
    quantity: 1,
    date: new Date(),
}

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
    const [isUpdate, setIsUpdate] = useState(false)
    const requisitionsList = useSelector((state) => state.requisition);
    const [reqItemDefaultValues, setReqItemDefaultValues] = useState(defaultState);
    const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();

   
    const fetchRequisitions = async () => {
        try {
            await dispatch(getRequisitionsList());
        } catch (e) {
            enqueueSnackbar('Failed to load requisitions', { variant: 'error' })
        }   
    }

    const cancelCreate = () => {
        setReqItemDefaultValues(defaultState);
        setIsUpdate(false);
        setCreateRequisition(false);
    }

    const handleEditRequisition = (requisition) => {
        setIsUpdate(true)
        setReqItemDefaultValues(requisition)
        setCreateRequisition(true)
    }

    useEffect(() => {
        fetchRequisitions();
    }, []);

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Requisitions</h1>
                <h2 className="text-muted">Total: 20,000</h2>
            </div>
            <Card elevation={3} className="pt-5 mb-6">
                <div className="flex justify-between items-center px-6 mb-3">
                    <h2 className="card-title">Created requisitions</h2>
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
                            defaultValues={reqItemDefaultValues}
                            isUpdate={isUpdate}
                        />
                    </div>
                )}
                <RequisitionList
                    requisitionsList={requisitionsList}
                    editRequisition={handleEditRequisition}
                />
            </Card>
        </div>
    )
}

export default Requisition
