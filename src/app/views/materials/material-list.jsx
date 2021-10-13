import React from 'react'
import {
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    IconButton,
    Icon,
    Typography,
} from '@material-ui/core'

const MaterialsList = ({ materialsList = [], editMaterial }) => {
    return (
        <Table className="whitespace-pre" stickyHeader>
            <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '15%' }} />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell className="px-6">Name</TableCell>
                    <TableCell className="px-6">Date</TableCell>
                    <TableCell className="px-6">Suppliers</TableCell>
                    <TableCell className="px-6">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {materialsList.map((material, i) => (
                    <TableRow key={i}>
                        <TableCell className="px-6">{material.name}</TableCell>
                        <TableCell className="px-6">{material.date}</TableCell>
                        <TableCell className="px-6">
                            {material.suppliers.map((supplier) => <Typography>{supplier.name}</Typography>)}
                        </TableCell>
                        <TableCell className="px-6">
                            <div className="flex">
                                <IconButton
                                    onClick={() => {
                                        editMaterial(material)
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

export default MaterialsList
