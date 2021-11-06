import React, { useContext } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Grid,
    Typography,
    Chip,
    CircularProgress,
} from '@material-ui/core'

const ViewSupplier = ({
    open,
    handleClose,
    handleApprove,
    handleReject,
    data,
    loading,
}) => {

    const render = () => {
        if (loading) {
            return (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            )
        }

        return (
            <>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">ID</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.id}</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">Name</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.name}</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">Email</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.email}</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">Phone</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.phone}</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">Address</b>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography>{data?.address}</Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <b variant="h6">Materials</b>
                        </Grid>
                        {/* <Grid item lg={6} sm={12}>
                            <Box spacing={1}>
                                {data.suppliers.map((supplier) => (
                                    <Chip label={supplier.name} />
                                ))}
                            </Box>
                        </Grid> */}
                    </Grid>
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
            </>
        )
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{`${data?.id || 'Supplier'}`}</DialogTitle>
            { render() }
        </Dialog>
    )
}

export default ViewSupplier