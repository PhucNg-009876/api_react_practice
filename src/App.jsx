import { useState } from 'react'
import "./app.scss"
import Header from './components/Header'
import TableUsers from './components/TableUsers'
import Container from 'react-bootstrap/Container';
import ModalAddUser from './components/ModalAddUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
 

  return (
    <div className='App-container'>
        <Header/>
        <Container>
         
          <TableUsers/>
        </Container>
       
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Bounce
          />
         
    </div>
  )
}

export default App
