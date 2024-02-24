import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {fetcAllUser} from '../service/UserService'
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import ModalAddUser from './ModalAddUser';
import ModalEdit from './ModalEdit';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const TableUsers = () => {
  const [listUser,setListUser] =useState([])  
  const [toTalUsers,setToTalUsers] = useState(0)
  const [toTalPages,setToTalPages] = useState(0)
  const[showModalAddUser,setShowModalAddUser] = useState(false)
  const[showModalEdit,setShowModalEdit] = useState(false)
  const[dataUserEdit,setDataUserEdit] = useState({})
  const[isShowModalDelete,setShowModalDelete] = useState(false)
  const[dataUserDelete,setDataUserDelete] = useState({})
  const handleClose=()=>{
    setShowModalAddUser(false)
  }
  const handleEditClose = ()=>{
    setShowModalEdit(false)
  }
  const handleDeleteClose = ()=>{
    setShowModalDelete(false)
  }
  const handleUpdateTable = (user)=>{
        setListUser([user,...listUser])
  }
  // pass data from table to modal
  const handleEditUser = (user)=>{
      setDataUserEdit(user)
      setShowModalEdit(true)
  }
  useEffect(()=>{
        // call api
       
      getUsers(1) 
  },[])  
  const getUsers = async(page)=>{
    // take data from promise
        let res = await fetcAllUser(page)
        // data not empty
        if(res && res.data ){
            setToTalUsers(res.total)
            setListUser(res.data)
            setToTalPages(res.total_pages)
          
        }
       
  }
  // chuyển trang
  const handlePageClick =(event)=>{
        getUsers(+ event.selected +1)
  }

  // edit user data
   const handleEditUserFromModal = (user)=>{
      let cloneListUser = _.cloneDeep(listUser) // lodash function
      let index =listUser.findIndex(Item => Item.id === user.id)
      // update data 
      cloneListUser[index].first_name = user.first_name
      setListUser(cloneListUser)
   }
   // delete
   const handleDeleteUser = (user)=>{
      setShowModalDelete(true)
      setDataUserDelete(user)
   }
   // table update delete
   const tableUpdate = (user)=>{
      let cloneListUser = _.cloneDeep(listUser) // lodash function
      cloneListUser = cloneListUser.filter(Item => Item.id !== user.id)
      // update table
      setListUser(cloneListUser)
   }
  return (
    <div>
        <div className='my-3 d-flex align-items-center'>
            List User:
            <button className='btn btn-success mx-3' onClick={()=>setShowModalAddUser(true)}>Add new user</button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID  <ArrowDownwardIcon/> <ArrowUpwardIcon/> </th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/** in data */}
                { 
                    // check
                    listUser && listUser.length>0 && 
                    listUser.map((Item,index)=>{
                            return(
                                <tr key={`user-${index}`}>
                                <td>{Item.id}</td>
                                <td>{Item.email}</td>
                                <td>{Item.first_name}</td>
                                <td>{Item.last_name}</td>
                                <td>
                                    <button className='btn btn-warning mx-3' onClick={()=>handleEditUser(Item)}>Edit</button>
                                    <button className='btn btn-danger' onClick={()=>handleDeleteUser(Item)}>Delete</button>
                                </td>
                                </tr>
                            )
                    })
                }
               
            </tbody>
        </Table>
        {/** pagination */}
        <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={toTalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
      />
        <ModalAddUser 
          show={showModalAddUser}
          handleClose={handleClose}
          handleUpdateTable ={handleUpdateTable}
        />
        <ModalEdit
          show ={showModalEdit}
          handleClose={handleEditClose}
          dataUserEdit ={dataUserEdit}
          handleEditUserFromModal ={handleEditUserFromModal}
        />
        <ModalConfirm
          show ={isShowModalDelete}
          handleClose={handleDeleteClose}
          dataUserDelete={dataUserDelete}
          tableUpdate={tableUpdate}
        />
    </div>
  )
}

export default TableUsers
