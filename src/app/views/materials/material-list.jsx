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
    Box,
    Button,
} from '@material-ui/core'

const MaterialsList = ({ materialsList = [], editMaterial, viewMaterial }) => {
    return (
        <Table className="whitespace-pre" stickyHeader>
            <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: '40%' }} />
                <col style={{ width: '30%' }} />
                {/* <col style={{ width: '15%' }} /> */}
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell className="px-6">ID</TableCell>
                    <TableCell className="px-6">Name</TableCell>
                    <TableCell className="px-6">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {materialsList.map((material, i) => (
                    <TableRow key={i}>
                        <TableCell className="px-6">{material.id}</TableCell>
                        <TableCell className="px-6">{material.name}</TableCell>
                        {/* <TableCell className="px-6">
                            <Box direction="row" spacing={1}>
                                {material.suppliers.map((supplier) => (
                                    <Chip label={supplier.name} />
                                ))}
                            </Box>
                        </TableCell> */}
                        <TableCell className="px-6">
                            <div className="flex">
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={() => {
                                        viewMaterial(material.id)
                                    }}
                                >
                                    View
                                </Button>
                                <IconButton
                                    onClick={() => {
                                        editMaterial(material.id)
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
