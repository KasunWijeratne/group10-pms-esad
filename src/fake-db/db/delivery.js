import Mock from '../mock'

const deliveriesList = [
    {
        id: 1,
        purchaseOrder: '123123',
        date: '18 january, 2019',
        items: [
            {
                material: 'mat1',
                quantity: 1,
                supplier: 'sup1',
                unitPrice: 100,
            },
        ],
        quantity: 6,
    },
    {
        id: 2,
        purchaseOrder: '4322523',
        date: '18 january, 2019',
        items: [
            {
                material: 'mat2',
                quantity: 1,
                supplier: 'sup2',
                unitPrice: 100,
            },
        ],
        quantity: 5,
    },
]

Mock.onGet('/api/delivery/all').reply((config) => {
    return [200, deliveriesList]
})
