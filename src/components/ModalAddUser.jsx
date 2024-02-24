import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { postCreateUser } from '../service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ModalAddUser = (props) => {
    const {show, handleClose,handleUpdateTable} = props;
    const[name,setNewUser] = useState("")
    const[job,setNewJob] = useState("")
    // api add user
    const handleSaveUser =  async()=>{
        let res = await postCreateUser(name, job)
        console.log(res)
        if(res && res.id){
          handleClose()
          setNewUser('')
          setNewJob('')
          toast.success('success')
          handleUpdateTable({first_name:name,id:res.id})
        }else{

        }
    }
  return (
    <div>
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
            <form>
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" 
                        className="form-control"
                        value={name}
                        onChange={(event)=>setNewUser(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Job</label>
                    <input type="text"
                            className="form-control"
                             value={job}
                             onChange={(event)=>setNewJob(event.target.value)} />
                </div>
            </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
    </div>
  )
}

export default ModalAddUser




