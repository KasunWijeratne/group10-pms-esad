import Mock from '../mock'

const requisitionsList = [
    {
        id: 1,
        site: 'col',
        date: '18 january, 2019',
        priority: 'low',
        status: 'pending',
        items: [
            {
                material: 'mat1',
                quantity: 1,
                supplier: 'sup1',
                unitPrice: 100,
            },
        ],
        price: 1765,
    },
    {
        id: 2,
        site: 'kan',
        date: '18 january, 2019',
        priority: 'high',
        status: 'approved',
        items: [
            {
                material: 'mat2',
                quantity: 1,
                supplier: 'sup2',
                unitPrice: 100,
            },
        ],
        price: 2121,
    },
]

Mock.onGet('/api/requisition/all').reply((config) => {
    return [200, requisitionsList]
})
