import Mock from '../mock'

const ordersList = [
    {
        id: 'order1',
        customer: 'Best Bank',
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
        customer: 'Cool Costumes',
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
        customer: 'Fast Food',
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
    {
        id: 'order4',
        customer: 'Next Meal',
        order: [
            {
                itemId: 'orderItem1',
                itemName: 'Order Item 1',
                price: 120,
            },
            {
                itemId: 'orderItem2',
                itemName: 'Order Item 2',
                price: 120,
            },
            {
                itemId: 'orderItem3',
                itemName: 'Order Item 3',
                price: 53,
            },
        ],
        date: '30 february, 2019',
        total: 294034,
        paymentType: 'Debit Card',
        status: 'completed',
    },
]

Mock.onGet('/api/order/all').reply((config) => {
    return [200, ordersList]
})
