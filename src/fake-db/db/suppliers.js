import Mock from '../mock'

const suppliersList = [
    {
        id: 'sup1',
        name: 'Supplier1',
        date: '18 january, 2019',
        address1: 'No, 24, Test',
        address2: 'Test street',
        city: 'City',
    },
    {
        id: 'sup2',
        name: 'Supplier2',
        date: '18 january, 2019',
        address1: 'No, 26, Test2',
        address2: 'Test street2',
        city: 'City2',
    },
    {
        id: 'sup3',
        name: 'Supplier3',
        date: '18 february, 2019',
        address1: 'No, 37, Test4',
        address2: 'Test street5',
        city: 'City5',
    },
]

Mock.onGet('/api/supplier/all').reply((config) => {
    return [200, suppliersList]
})
