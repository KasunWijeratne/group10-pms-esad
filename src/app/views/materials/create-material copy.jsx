import React, { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Grid, Button, Divider } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Autocomplete } from '@material-ui/lab'

const FormFields = {
    name: 'name',
    suppliers: 'suppliers',
    date: 'date',
}

const validationSchema = yup.object({
    [FormFields.name]: yup.string().required('Name is required'),
    [FormFields.date]: yup.date().required('Date is required'),
})

const CreateMaterial = ({
    suppliers,
    cancel,
    defaultValues,
    isUpdate,
}) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return {
                [FormFields.name]: defaultValues.name,
                [FormFields.suppliers]: defaultValues.suppliers,
                [FormFields.date]: defaultValues.date,
            }
        }, [defaultValues]),
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
                    <Grid item lg={4} sm={12} xs={12}>
                        <Controller
                            name={FormFields.name}
                            control={control}
                            render={({
                                field: { onChange, value = '' },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    id={FormFields.name}
                                    label="Name"
                                    value={value}
                                    onChange={onChange}
                                    error={error}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={8} sm={12} xs={12}>
                        <Controller
                            render={({
                                field: { onChange, ...props },
                                fieldState: { error },
                            }) => (
                                <Autocomplete
                                    {...props}
                                    multiple
                                    options={suppliers}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Suppliers"
                                        />
                                    )}
                                    onChange={(e, data) => {
                                        onChange(data)
                                    }}
                                />
                            )}
                            onChange={([, data]) => data}
                            name={FormFields.suppliers}
                            control={control}
                        />
                    </Grid>
                    <Grid item lg={4} sm={12} xs={12}>
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
                                        id={FormFields.date}
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
                    <Grid container className="flex justify-end">
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                        >
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
                </Grid>
            </form>
            <Divider className="mt-6" />
        </div>
    )
}

export default CreateMaterial
