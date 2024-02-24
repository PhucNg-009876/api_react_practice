// import instance từ file CustomAxios
import axios from './CustomAxios'


const fetcAllUser = (page)=>{
        // return promise
        return   axios.get(`/api/users?page=${page}`)
}

// api add user
const postCreateUser = (name, job) =>{
      return  axios.post("/api/users",{name,job})
}
// api edit user
const putEditUser = (name,job)=>{
      return  axios.put("/api/users/",{name,job})
}
// api delete user
const deleteUser = (id)=>{
      return  axios.delete(`/api/users/${id}`)
}
export {fetcAllUser ,postCreateUser,putEditUser , deleteUser}