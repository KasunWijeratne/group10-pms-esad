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
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
} from '@material-ui/core'
import AuthContext from 'app/contexts/JWTAuthContext'

const ViewDelivery = ({ open, handleClose, handleApprove, handleReject, data }) => {
    const { user } = useContext(AuthContext);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{`Delivery ${data?.id}`}</DialogTitle>
            <DialogContent>
                <Grid container>
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
                </Grid>
                {user.role === 'ACC_MANAGER' && (
                    <Box my={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            Return
                        </Button>
                    </Box>
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
        </Dialog>
    )
}

export default ViewDelivery
