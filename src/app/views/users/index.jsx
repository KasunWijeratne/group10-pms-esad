import { Card, Button } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import CreateUser from './create-user'
import { getUsersList } from 'app/redux/actions/UserActions'
import UsersList from './users-list'
import { render } from 'node-sass'
import Loading from 'app/components/MatxLoading/MatxLoading'

const defaultState = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    role: [],
    date: new Date(),
}

const Users = () => {
    const [showCreateUser, setCreateUser] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const usersList = useSelector((state) => state.users)
    const [userDefaultValues, setUserDefaultValues] =
        useState(defaultState)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)

    const fetchUsers = async () => {
        try {
            setLoading(true);
            await dispatch(getUsersList())
        } catch (e) {
            enqueueSnackbar('Failed to load users', { variant: 'error' })
        } finally {
            setLoading(false);
        }
    }

    const cancelCreate = () => {
        setUserDefaultValues(defaultState)
        setIsUpdate(false)
        setCreateUser(false)
    }

    const handleEditUser = (user) => {
        setIsUpdate(true)
        setUserDefaultValues(user)
        setCreateUser(true)
    }

    const render = () => {
        if (loading) {
            return <Loading />
        }

        return (
            <Card elevation={3} className="pt-5 mb-6">
                <div className="flex justify-between items-center px-6 mb-3">
                    <h2 className="card-title">Created users</h2>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        disabled={showCreateUser}
                        onClick={setCreateUser}
                    >
                        New
                    </Button>
                </div>
                {showCreateUser && (
                    <div className="p-6">
                        <CreateUser
                            cancel={cancelCreate}
                            defaultValues={userDefaultValues}
                            isUpdate={isUpdate}
                        />
                    </div>
                )}
                <UsersList usersList={usersList} editUser={handleEditUser} />
            </Card>
        )
    }

    useEffect(() => {
        if (!usersList.length) {
            fetchUsers()    
        }
    }, [])

    return (
        <div className="requisitions m-sm-30 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h1>Users</h1>
            </div>
            { render() }
        </div>
    )
}

export default Users
