import React from 'react'
import {
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    IconButton,
    Icon,
    Box,
    Chip,
} from '@material-ui/core'

const UsersList = ({ usersList = [], editUser }) => {
    return (
        <Table className="whitespace-pre" stickyHeader>
            <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell className="px-6">First Name</TableCell>
                    <TableCell className="px-6">Last Name</TableCell>
                    <TableCell className="px-6">Email</TableCell>
                    <TableCell className="px-6">Role</TableCell>
                    <TableCell className="px-6">Date</TableCell>
                    <TableCell className="px-6">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usersList.map((user, i) => (
                    <TableRow key={i}>
                        <TableCell className="px-6">{user.fname}</TableCell>
                        <TableCell className="px-6">{user.lname}</TableCell>
                        <TableCell className="px-6">{user.email}</TableCell>
                        <TableCell className="px-6">
                            <Box direction="row" spacing={1}>
                                {user.role.map((r) => (
                                    <Chip label={r.title} />
                                ))}
                            </Box>
                        </TableCell>
                        <TableCell className="px-6">{user.date}</TableCell>
                        <TableCell className="px-6">
                            <div className="flex">
                                <IconButton
                                    onClick={() => {
                                        editUser(user)
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

export default UsersList
