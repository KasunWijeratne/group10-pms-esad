import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
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
    date: 'date',
}

const validationSchema = yup.object({
    items: yup.array().of(
        yup.object({
            [FormFields.site]: yup.string().required('Site is required'),
            [FormFields.priority]: yup
                .string()
                .required('Priority is required'),
            [FormFields.material]: yup
                .string()
                .required('Material is required'),
            [FormFields.supplier]: yup
                .string()
                .required('Supplier is required'),
            [FormFields.date]: yup.date().required('Date is required'),
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
    const [reqList, setReqList] = useState(defaultValues);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(
            () =>
                reqList.map((item) => ({
                    [FormFields.site]: defaultValues.site,
                    [FormFields.priority]: defaultValues.priority,
                    [FormFields.material]: defaultValues.material,
                    [FormFields.supplier]: defaultValues.supplier,
                    [FormFields.date]: defaultValues.date,
                })),
            [defaultValues, reqList]
        ),
        resolver: yupResolver(validationSchema),
    })
    // const { fields = [], append } = useFieldArray({
    //     control,
    //     name: 'items',
    // })

    const onSubmit = (form) => {
        debugger
    }

    const addItems = () => {
        setReqList([...reqList, defaultState]);
    }

    const removeItem = (index) => {
        const items = [...reqList]
        if (items.length < 1) {
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
                {reqList.map((field, i) => (
                    <Grid container spacing={2} key={`item${i}`}>
                        <Grid item lg={3} sm={12} xs={12}>
                            <Controller
                                name={`items[${i}].${FormFields.site}`}
                                control={control}
                                render={({
                                    field: { onChange, value = '' },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        name={`items[${i}].${FormFields.site}`}
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
                                name={`items[${i}].${FormFields.priority}`}
                                control={control}
                                render={({
                                    field: { onChange, value = '' },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        id={`items[${i}].${FormFields.priority}`}
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
                                name={`items[${i}].${FormFields.date}`}
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDatePicker
                                            className="mb-4 w-full"
                                            margin="none"
                                            name={`items[${i}].${FormFields.date}`}
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
                        <Grid
                            item
                            lg={9}
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
