import React, { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    TextField,
    Grid,
    Button,
    Divider,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Autocomplete } from '@material-ui/lab'

const FormFields = {
    purchaseOrder: 'purchaseOrder',
    quantity: 'quantity',
    date: 'date',
}

const validationSchema = yup.object({
    [FormFields.purchaseOrder]: yup.string().required('Purchase order id is required'),
    [FormFields.quantity]: yup.number().required('Quantity is required'),
    [FormFields.date]: yup.date().required('Date is required'),
})

const CreateDelivery = ({
    defaultValues,
    ordersList,
    isUpdate,
    cancel,
}) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(
            () => ({
                [FormFields.purchaseOrder]: defaultValues.purchaseOrder,
                [FormFields.date]: defaultValues.date,
                [FormFields.quantity]: defaultValues.quantity,
            }),
            [defaultValues]
        ),
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (form) => {
        debugger
    }

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues, reset])

    return (
        <div>
            <Divider className="mb-4" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item lg={3} sm={12} xs={12}>
                        <Controller
                            name={FormFields.date}
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        className="mb-4 w-full"
                                        margin="none"
                                        name={FormFields.date}
                                        label="Date"
                                        inputVariant="standard"
                                        type="text"
                                        autoOk={true}
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            )}
                        />
                    </Grid>
                    <Grid item lg={3} sm={12} xs={12}>
                        <Controller
                            render={({
                                field: { onChange, ...props },
                                fieldState: { error },
                            }) => (
                                <Autocomplete
                                    {...props}
                                    options={ordersList}
                                    getOptionLabel={(option) => option.id}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Order" />
                                    )}
                                    onChange={(e, data) => {
                                        onChange(data)
                                    }}
                                />
                            )}
                            onChange={([, data]) => data}
                            name={FormFields.purchaseOrder}
                            control={control}
                        />
                    </Grid>
                    <Grid item lg={3} sm={12} xs={12}>
                        <Controller
                            name={FormFields.quantity}
                            control={control}
                            render={({
                                field: { onChange, value = 1 },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    id={FormFields.quantity}
                                    label="Quantity"
                                    value={value}
                                    onChange={onChange}
                                    error={error}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container className="flex justify-end">
                    <Button type="submit" variant="outlined" color="primary">
                        {isUpdate ? 'Update' : 'Create'}
                    </Button>
                    <Button
                        className="ml-4"
                        type="button"
                        onClick={() => cancel()}
                    >
                        Cancel
                    </Button>
                </Grid>
            </form>
            <Divider className="mt-6" />
        </div>
    )
}

export default CreateDelivery
