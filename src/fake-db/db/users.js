import Mock from '../mock'

const usersList = [
    {
        id: 'user1',
        fname: 'John',
        lname: 'Doe',
        email: 'john@doe.com',
        password: 'test',
        role: [
            {
                title: 'Site Manager',
                value: 'SITE_MANAGER',
            },
        ],
        date: '12 June 2021',
    },
    {
        id: 'user2',
        fname: 'Anne',
        lname: 'Doe',
        email: 'anne@doe.com',
        password: 'test',
        role: [
            {
                title: 'Account Manager',
                value: 'ACC_MANAGER',
            },
        ],
        date: '12 June 2021',
    },
]

Mock.onGet('/api/user/all').reply((config) => {
    return [200, usersList]
})
