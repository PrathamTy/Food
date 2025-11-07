import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Sidebar from './Component/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Order from './Pages/Order/Order'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000"

  return (
    <div>
        <ToastContainer/>
       <Navbar/>
       <hr/>
       <div className='app-content'>
          <Sidebar/>
          <Routes>
            <Route path="/add" element={<Add/>}/>
            <Route path="/list" element={<List/>}/>

          </Routes>
       </div>
    </div>
  )
}

export default App
