import Mock from '../mock'

const ordersList = [
    {
        id: 'order1',
        customer: 'Customer 1',
        order: [
            {
                itemId: 'orderItem1',
                itemName: 'Order Item 1',
                price: 120,
            },
            {
                itemId: 'orderItem2',
                itemName: 'Order Item 2',
                price: 53,
            },
        ],
        date: '18 january, 2019',
        total: 3092,
        paymentType: 'Bank transfer',
        status: 'pending',
    },
    {
        id: 'order2',
        customer: 'Customer 2',
        order: [
            {
                itemId: 'orderItem1',
                itemName: 'Order Item 1',
                price: 452,
            },
        ],
        date: '20 february, 2019',
        total: 59820,
        paymentType: 'Credit Card',
        status: 'approved',
    },
    {
        id: 'order3',
        customer: 'Customer 3',
        order: [
            {
                itemId: 'orderItem1',
                itemName: 'Order Item 1',
                price: 120,
            },
        ],
        date: '30 february, 2019',
        total: 294034,
        paymentType: 'Debit Card',
        status: 'canceled',
    },
]

Mock.onGet('/api/order/all').reply((config) => {
    return [200, ordersList]
})
