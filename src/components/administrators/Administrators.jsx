import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import axios from 'axios'
import { useEffect } from 'react'
import AddUserModal from './AddUserModal'
import './Administrators.css'

export default function Administrators() {
    const [users, setusers] = useState([])
    const [showAdduserModal, setshowAdduserModal] = useState(false)
    const [addusertoggle, setaddusertoggle] = useState(false)

    const handleClose = () => setshowAdduserModal(false)

    const addUser = () => {
        setshowAdduserModal(true)
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/listAdminUsers`)
            .then((result) => {
                setusers(result.data.adminUsersData)
            })
    }, [addusertoggle])
    return (
        <div>
            <h4 className='weloce-text'>Coupon Administrators</h4><br />
            <div className='administrators-container'>
                <Table bordered hover style={{ textAlign: 'center' }}>
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
                <div className='modal-add-btn'>
                    <Button onClick={addUser}>Add</Button>
                </div>
            </div>
            <Modal show={showAdduserModal} onHide={handleClose}>
                <AddUserModal
                    setaddusertoggle={setaddusertoggle}
                    addusertoggle={addusertoggle}
                    setshowAdduserModal={setshowAdduserModal}
                />
            </Modal>
        </div>
    )
}
