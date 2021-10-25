import React from 'react'
import {
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    IconButton,
    Icon,
    Chip,
    Button,
} from '@material-ui/core'

const DeliveryList = ({ deliveriesList = [], viewDelivery }) => {
    return (
        <Table className="whitespace-pre" stickyHeader>
            <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell className="px-6">Created Date</TableCell>
                    <TableCell className="px-6">Order ID</TableCell>
                    <TableCell className="px-6">Quantity</TableCell>
                    <TableCell className="px-6">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {deliveriesList.map((delivery, i) => (
                    <TableRow key={i}>
                        <TableCell className="px-6">
                            {delivery.date}
                        </TableCell>
                        <TableCell className="px-6">
                            {delivery.purchaseOrder}
                        </TableCell>
                        <TableCell className="px-6">
                            {delivery.quantity}
                        </TableCell>
                        <TableCell className="px-6">
                            <div className="flex">
                                {/* <IconButton
                                    onClick={() => {
                                        editRequisition(delivery)
                                    }}
                                >
                                    <Icon>edit</Icon>
                                </IconButton> */}
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={() => {
                                        viewDelivery(delivery, true)
                                    }}
                                >
                                    View
                                </Button>
                                <IconButton>
                                    <Icon>print</Icon>
                                </IconButton>
                                <IconButton>
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DeliveryList
