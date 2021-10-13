import React from 'react'
import {
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    IconButton,
    Icon,
} from '@material-ui/core'
import StateLabel from 'app/components/StateLabel'

const RequisitionList = ({ requisitionsList = [], editRequisition }) => {
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
                            <StateLabel type={requisition.priority}>
                                {requisition.priority}
                            </StateLabel>
                        </TableCell>
                        <TableCell className="px-6">
                            ${requisition.price}
                        </TableCell>
                        <TableCell className="px-6">
                            <div className="flex">
                                <IconButton
                                    onClick={() => {
                                        editRequisition(requisition)
                                    }}
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
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
