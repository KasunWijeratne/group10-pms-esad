import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    TextField,
    MenuItem,
    Grid,
    Button,
    Divider,
    IconButton,
    Icon,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { defaultState } from '.'

const FormFields = {
    site: 'site',
    priority: 'priority',
    material: 'material',
    supplier: 'supplier',
    quantity: 'quantity',
    date: 'date',
}

const validationSchema = yup.object({
    [FormFields.priority]: yup.string().required('Priority is required'),
    [FormFields.date]: yup.date().required('Date is required'),
    [FormFields.site]: yup.string().required('Site is required'),
    items: yup.array().of(
        yup.object({
            [FormFields.material]: yup
                .string()
                .required('Material is required'),
            [FormFields.supplier]: yup
                .string()
                .required('Supplier is required'),
            [FormFields.quantity]: yup
                .number()
                .required('Quantity is required'),
        })
    ),
})

const CreateRequisition = ({
    sites,
    materials,
    suppliers,
    priority,
    cancel,
    defaultValues,
    isUpdate,
}) => {
    debugger;
    const [reqList, setReqList] = useState(defaultValues);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(
            () => ({
                [FormFields.site]: defaultValues.site,
                [FormFields.date]: defaultValues.date,
                [FormFields.priority]: defaultValues.priority,
                items: reqList.map((item) => ({
                    [FormFields.material]: defaultValues.material,
                    [FormFields.supplier]: defaultValues.supplier,
                    [FormFields.quantity]: defaultValues.quantity,
                })),
            }),
            [defaultValues, reqList]
        ),
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (form) => {
        debugger
    }

    const addItems = () => {
        setReqList([...reqList, defaultState]);
    }

    const removeItem = (index) => {
        const items = [...reqList]
        if (items.length > 1) {
            items.splice(index, 1)
            setReqList(items)
        }
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
                            name={FormFields.site}
                            control={control}
                            render={({
                                field: { onChange, value = '' },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    name={FormFields.site}
                                    select
                                    label="Site"
                                    value={value}
                                    onChange={onChange}
                                    error={error}
                                    fullWidth
                                >
                                    {sites.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item lg={3} sm={12} xs={12}>
                        <Controller
                            name={FormFields.priority}
                            control={control}
                            render={({
                                field: { onChange, value = '' },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    id={FormFields.priority}
                                    select
                                    label="Priority"
                                    value={value}
                                    onChange={onChange}
                                    fullWidth
                                    error={error}
                                >
                                    {priority.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
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
                </Grid>
                <Divider className="m-3" />
                {reqList.map((field, i) => (
                    <Grid container spacing={2} key={`item${i}`}>
                        <Grid item lg={3} sm={12} xs={12}>
                            <Controller
                                name={`items[${i}].${FormFields.material}`}
                                control={control}
                                render={({
                                    field: { onChange, value = '' },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        name={`items[${i}].${FormFields.material}`}
                                        select
                                        label="Material"
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        fullWidth
                                    >
                                        {materials.map((option) => (
                                            <MenuItem
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item lg={3} sm={12} xs={12}>
                            <Controller
                                name={`items[${i}].${FormFields.supplier}`}
                                control={control}
                                render={({
                                    field: { onChange, value = '' },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        name={`items[${i}].${FormFields.supplier}`}
                                        select
                                        label="Supplier"
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        fullWidth
                                    >
                                        {suppliers.map((option) => (
                                            <MenuItem
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item lg={3} sm={12} xs={12}>
                            <Controller
                                name={`items[${i}].${FormFields.quantity}`}
                                control={control}
                                render={({
                                    field: { onChange, value = 1 },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        name={`items[${i}].${FormFields.quantity}`}
                                        label="Quantity"
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={12}
                            xs={12}
                            className="flex justify-end"
                        >
                            <IconButton
                                onClick={() => {
                                    removeItem()
                                }}
                            >
                                <Icon>remove_circle_outline</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
                <Grid container className="flex justify-end">
                    <IconButton
                        onClick={() => {
                            addItems()
                        }}
                    >
                        <Icon color="primary">add_circle_outline</Icon>
                    </IconButton>
                </Grid>
                <Divider className="m-3" />
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

export default CreateRequisition
