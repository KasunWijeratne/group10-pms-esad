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

const SuppliersList = ({ suppliersList = [], editSupplier }) => {
    return (
        <Table className="whitespace-pre" stickyHeader>
            <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '15%' }} />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell className="px-6">Name</TableCell>
                    <TableCell className="px-6">Address</TableCell>
                    <TableCell className="px-6">City</TableCell>
                    <TableCell className="px-6">Date</TableCell>
                    <TableCell className="px-6">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {suppliersList.map((supplier, i) => (
                    <TableRow key={i}>
                        <TableCell className="px-6">{supplier.name}</TableCell>
                        <TableCell className="px-6">{`${supplier.address1} ${supplier.address2}`}</TableCell>
                        <TableCell className="px-6">{supplier.city}</TableCell>
                        <TableCell className="px-6">{supplier.date}</TableCell>
                        <TableCell className="px-6">
                            <div className="flex">
                                <IconButton
                                    onClick={() => {
                                        editSupplier(supplier)
                                    }}
                                >
                                    <Icon>edit</Icon>
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

export default SuppliersList
