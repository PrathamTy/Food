import React,{useEffect, useState} from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/cart'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/placeorder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'


const App = () => {
  const [showLogin,setshowLogin] = useState(false);
  return (
    <>
    {showLogin && <LoginPopup setshowLogin={setshowLogin}/>}
    <div className="app">
        <h2>{showLogin}</h2>
        <Navbar setshowLogin={setshowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
        <Footer/> 
      </div>
    </>
  )
}

export default App
