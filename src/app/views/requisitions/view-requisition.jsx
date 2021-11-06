import React, { useContext } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    Grid,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
} from '@material-ui/core'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import AuthContext from 'app/contexts/JWTAuthContext'

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
    });
    const { user } = useContext(AuthContext);

    const onSubmit = (form) => {
        debugger;
        handleReject(data?.id, form.comment);
    }

    const onApprove = () => {
        handleApprove(data?.id)
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{`Requisition ${data?.id}`}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">ID</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.id}</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">Date</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.date}</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">Site</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.site}</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">Priority</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.priority}</Typography>
                        </Grid>
                        <Grid item lg={12} sm={12}>
                            <b variant="h6">Items</b>
                        </Grid>
                        <Grid item lg={12} sm={12}>
                            <Table className="whitespace-pre" stickyHeader>
                                <colgroup>
                                    <col style={{ width: '25%' }} />
                                    <col style={{ width: '25%' }} />
                                    <col style={{ width: '25%' }} />
                                    <col style={{ width: '25%' }} />
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="px-6">
                                            Material
                                        </TableCell>
                                        <TableCell className="px-6">
                                            Supplier
                                        </TableCell>
                                        <TableCell className="px-6">
                                            Quantity
                                        </TableCell>
                                        <TableCell className="px-6">
                                            Unit Price
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.items.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="px-6">
                                                {item.material}
                                            </TableCell>
                                            <TableCell className="px-6">
                                                <Chip label={item.supplier} />
                                            </TableCell>
                                            <TableCell className="px-6">
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell className="px-6">
                                                ${item.price}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                        {data?.status === 'declined' && (
                            <>
                                <Grid item lg={6} sm={12}>
                                    <b variant="h6" color="secondary">
                                        Declined Reason
                                    </b>
                                </Grid>
                                <Grid item lg={6} sm={12}>
                                    <Typography color="error">
                                        {data?.reason ? data?.reason : ''}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    {user.role === 'ACC_MANAGER' &&
                        data?.status !== 'declined' && (
                            <>
                                <Box my={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={onApprove}
                                    >
                                        Approve
                                    </Button>
                                </Box>
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
                                <Box my={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Decline
                                    </Button>
                                </Box>
                            </>
                        )}
                </DialogContent>
                <Box p={2}>
                    <DialogActions>
                        <Button
                            type="button"
                            onClick={() => {
                                handleClose(false)
                            }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Box>
            </form>
        </Dialog>
    )
}

export default ViewRequisition
