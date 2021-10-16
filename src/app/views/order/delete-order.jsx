import React, { useMemo } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

const FormFields = {
    comment: 'comment',
}

const validationSchema = yup.object({
    [FormFields.comment]: yup.string().required("Please add the reason for deleting the order"),
})

const DeleteOrder = ({ open, handleClose, handleDelete }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            [FormFields.comment]: '',
        },
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (form) => {
        handleDelete(form);
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Delete Order</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Order?
                    </DialogContentText>
                    <Controller
                        name={FormFields.comment}
                        control={control}
                        render={({
                            field: { onChange, value = '' },
                            fieldState: { error },
                        }) => (
                            <TextField
                                id={FormFields.comment}
                                label="Comment"
                                value={value}
                                onChange={onChange}
                                error={error}
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Delete</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default DeleteOrder
