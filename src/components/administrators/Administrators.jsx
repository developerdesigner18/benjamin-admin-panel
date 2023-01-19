import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { useEffect } from 'react'

export default function Administrators() {
    const [users, setusers] = useState([])

    const addUser = () => {
        console.log('add user opne model');
    }
    useEffect(() => {
        axios.get('http://54.90.77.44:8000/user/listAdminUsers')
            .then((result) => {
                console.log(result.data.adminUsersData);
                setusers(result.data.adminUsersData)
            })
    }, [])
    return (
        <div>
            <h4 className='weloce-text'>Coupon Administrators</h4><br />
            <Table bordered hover style={{ textAlign: 'center', width: '50%' }}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>UpdatePassword</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <>
                                <tr>
                                    <td>{user.email}</td>
                                    <td><p>UpdatePassword</p></td>
                                    <td><p>Delete</p></td>

                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
            <Button onClick={addUser}>Add</Button>
        </div>
    )
}
