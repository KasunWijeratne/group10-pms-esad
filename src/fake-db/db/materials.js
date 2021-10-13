import Mock from '../mock'

const materialList = [
    {
        id: 'mat1',
        name: 'Material1',
        date: '18 january, 2019',
        suppliers: [
            {
                name: 'Supplier1',
                unitPrice: 150,
            },{
                name: 'Supplier2',
                unitPrice: 160,
            },
        ],
    },
    {
        id: 'mat2',
        name: 'Material2',
        date: '23 january, 2019',
        suppliers: [
            {
                name: 'Supplier2',
                unitPrice: 170,
            },
        ],
    },
]

Mock.onGet('/api/material/all').reply((config) => {
    return [200, materialList]
})
