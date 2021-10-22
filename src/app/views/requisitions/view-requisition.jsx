import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Box,
    Grid,
    Typography,
} from '@material-ui/core'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

const FormFields = {
    comment: 'comment',
    action: 'action',
}

const validationSchema = yup.object({
    [FormFields.comment]: yup.string().required("Please add the reason for rejecting the requisition"),
})

const ViewRequisition = ({ open, handleClose, handleApprove, handleReject, data }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            [FormFields.comment]: '',
        },
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (form) => {
        handleSubmit(form)
    }

    console.log(data)

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{`Requisition ${data?.id}`}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container>
                        <Grid item lg={6} sm={12}>
                            <Typography variant="h5">Site</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.name}</Typography>
                        </Grid>
                    </Grid>
                    <Button variant="contained">Approve</Button>
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
                    <Button type="submit" variant="contained">
                        Reject
                    </Button>
                </DialogContent>
                <Box p={2}>
                    <DialogActions>
                        <Button
                            type="button"
                            onClick={() => {
                                handleClose(false)
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Box>
            </form>
        </Dialog>
    )
}

export default ViewRequisition
