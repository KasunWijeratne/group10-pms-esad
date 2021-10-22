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
import { useTheme } from '@material-ui/styles'

const RequisitionList = ({ requisitionsList = [], editRequisition, viewRequisition }) => {
    const theme = useTheme();
    const getColor = (type) => {
        if (type === 'high') {
            return theme.palette.error.main;
        } else if (type === 'medium') {
            return theme.palette.success.main;
        } else {
            return theme.palette.primary.main;
        }
    }
    return (
        <Table className="whitespace-pre" stickyHeader>
            <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '17%' }} />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell className="px-6">Material</TableCell>
                    <TableCell className="px-6">Quantity</TableCell>
                    <TableCell className="px-6">Start Date</TableCell>
                    <TableCell className="px-6">Supplier</TableCell>
                    <TableCell className="px-6">Unit Price</TableCell>
                    <TableCell className="px-6">Priority</TableCell>
                    <TableCell className="px-6">Price</TableCell>
                    <TableCell className="px-6">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {requisitionsList.map((requisition, i) => (
                    <TableRow key={i}>
                        <TableCell className="px-6">
                            {requisition.material}
                        </TableCell>
                        <TableCell className="px-6">
                            {requisition.quantity}
                        </TableCell>
                        <TableCell className="px-6">
                            {requisition.date}
                        </TableCell>
                        <TableCell className="px-6">
                            {requisition.supplier}
                        </TableCell>
                        <TableCell className="px-6">
                            {requisition.unitPrice}
                        </TableCell>
                        <TableCell className="px-6">
                            <Chip
                                style={{
                                    background: getColor(requisition.priority),
                                    color: '#fff',
                                }}
                                label={requisition.priority}
                            />
                        </TableCell>
                        <TableCell className="px-6">
                            ${requisition.price}
                        </TableCell>
                        <TableCell className="px-6">
                            <div className="flex">
                                {/* <IconButton
                                    onClick={() => {
                                        editRequisition(requisition)
                                    }}
                                >
                                    <Icon>edit</Icon>
                                </IconButton> */}
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={() => {
                                        viewRequisition(requisition, true)
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

export default RequisitionList
