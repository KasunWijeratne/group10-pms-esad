import React, { useState } from 'react'
import {
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    IconButton,
    Icon,
    Collapse,
    Box,
    Button,
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import StateLabel from 'app/components/StateLabel';

const OrderList = ({ ordersList = [], handleDialog }) => {
    const [open, setOpen] = useState(false)

    return (
        <Table className="whitespace-pre" stickyHeader>
            <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '8%' }} />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell className="px-6">Order ID</TableCell>
                    <TableCell className="px-6">Customer</TableCell>
                    <TableCell className="px-6">Order</TableCell>
                    <TableCell className="px-6">Request Date</TableCell>
                    <TableCell className="px-6" align="right">
                        Total
                    </TableCell>
                    <TableCell className="px-6">Payment Type</TableCell>
                    <TableCell className="px-6">Status</TableCell>
                    <TableCell className="px-6">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ordersList.map((order, i) => (
                    <>
                        <TableRow key={i}>
                            <TableCell className="px-6">{order.id}</TableCell>
                            <TableCell className="px-6">
                                {order.customer}
                            </TableCell>
                            <TableCell className="px-6">
                                <Button
                                    variant="text"
                                    color="primary"
                                    endIcon={
                                        open === order.id ? (
                                            <KeyboardArrowUp />
                                        ) : (
                                            <KeyboardArrowDown />
                                        )
                                    }
                                    onClick={() =>
                                        setOpen(
                                            open === order.id ? null : order.id
                                        )
                                    }
                                >
                                    Show items
                                </Button>
                            </TableCell>
                            <TableCell className="px-6">{order.date}</TableCell>
                            <TableCell className="px-6" align="right">
                                ${order.total}
                            </TableCell>
                            <TableCell className="px-6">
                                {order.paymentType}
                            </TableCell>
                            <TableCell className="px-6">
                                <StateLabel type={order.status}>
                                    {order.status}
                                </StateLabel>
                            </TableCell>
                            <TableCell className="px-6">
                                <div className="flex">
                                    <IconButton onClick={handleDialog}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                style={{ padding: 0, background: '#fafafa' }}
                                colSpan={8}
                            >
                                <Collapse
                                    in={open === order.id}
                                    timeout="auto"
                                    width={1}
                                    unmountOnExit
                                >
                                    <Box sx={{ padding: 20 }}>
                                        <b>Order items</b>
                                        <Table>
                                            <colgroup>
                                                <col style={{ width: '30%' }} />
                                                <col style={{ width: '50%' }} />
                                                <col style={{ width: '20%' }} />
                                            </colgroup>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        Order ID
                                                    </TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">
                                                        Price
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {order.order.map((item, i) => (
                                                    <TableRow
                                                        key={`${item.itemId}${i}`}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {item.itemId}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.itemName}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {item.price}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
    )
}

export default OrderList
