import Mock from '../mock'

const requisitionsList = [
    {
        id: '',
        material: 'mat1',
        site: 'col',
        quantity: 1,
        date: '18 january, 2019',
        supplier: 'sup1',
        unitPrice: 100,
        priority: 'low',
        price: 2121,
    },
    {
        id: '',
        material: 'mat2',
        site: 'kan',
        quantity: 1,
        date: '18 january, 2019',
        supplier: 'sup2',
        unitPrice: 100,
        priority: 'high',
        price: 2121,
    },
]

Mock.onGet('/api/requisition/all').reply((config) => {
    return [200, requisitionsList]
})
