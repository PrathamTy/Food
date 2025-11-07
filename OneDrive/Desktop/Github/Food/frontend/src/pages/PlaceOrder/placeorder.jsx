import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const placeorder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
  const[data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",

  })
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async(event) =>{
    event.preventDefault()
    let OrderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        OrderItems.push(itemInfo)
      }
    })
    let orderData={
      address:data,
      items:OrderItems,
      amount: getTotalCartAmount()+2
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success) {
      const {session_url} = response.data
      window.location.replace(session_url)
    }
    else {
      alert("Error")
    }
  }
  
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount() == 0) {
      navigate('/cart')
    }
  },[token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-feilds">
          <input required name='firstName' value={data.firstName} onChange={onChangeHandler} type='text' placeholder='First name' />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type='text' placeholder='Last name' />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Email address' />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />
        <div className="multi-feilds">
          <input required name="city" value={data.city} onChange={onChangeHandler} type='text' placeholder='City' />
          <input required name="state" value={data.state} onChange={onChangeHandler} type='text' placeholder='State' />
        </div>
        <div className="multi-feilds">
          <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} type='text' placeholder='Zipcode' />
          <input required name="country" value={data.country} onChange={onChangeHandler} type='text' placeholder='Country' />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
            <hr />
          </div>
          <button type='submit'>Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}
export default placeorder
