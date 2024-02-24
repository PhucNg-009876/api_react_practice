import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { putEditUser } from '../service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ModalEdit = (props) => {
    const {show, handleClose,dataUserEdit,handleEditUserFromModal} = props;
    const[name,setUser] = useState("")
    const[job,setJob] = useState("")
    // api update user
    const handleEditUser = async ()=>{
        const res= await putEditUser(name,job)
        console.log(res)
        if(res && res.updatedAt){
              // success
              handleEditUserFromModal({first_name:name,id:dataUserEdit.id})
        }
          handleClose()
          
      }
    useEffect(()=>{
        if(show){
           setUser(dataUserEdit.first_name)
        }
    },[dataUserEdit]) // check khi dataUserEdit thay đổi
  return (
    <div>
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
            <form>
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" 
                        className="form-control"
                        value={name}
                        onChange={(event)=>setUser(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Job</label>
                    <input type="text"
                            className="form-control"
                             value={job}
                             onChange={(event)=>setJob(event.target.value)} />
                </div>
            </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
    </div>
  )
}

export default ModalEdit




