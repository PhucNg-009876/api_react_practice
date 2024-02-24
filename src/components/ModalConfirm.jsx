import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalConfirm = (props) => {
    const {show, handleClose,dataUserDelete,tableUpdate} = props;
    // api delete 
    const handleDeleteUser = async()=>{
        let res = await deleteUser(dataUserDelete.id);
        if(res && res.statusCode ===204){
          toast.success('xóa success')
          handleClose()
          tableUpdate(dataUserDelete)
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
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                Are you sure to delete <b> {dataUserDelete.email} </b>?
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
    </div>
  )
}

export default ModalConfirm




