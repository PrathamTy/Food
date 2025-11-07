import React from 'react'
import './Order.css'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import axios from "axios"
import { assets } from '../../assets/assets'


const Order = ({url}) => {
  const[order,setOrder] = useState([])
  
  const fetchAllOrders = async()=>{
    const response = await axios.get(url+"/api/order/list")
    if(response.data.success) {
      setOrder(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div className='order add'>
        <h3>Order Page</h3>
        <p>{order.map((item,index)=>{
            return item.name
        })}</p>
        <div className="order-list">
          {order.map((order,index)=>{
            <div key={index} className='order-item'>
               <img src={assets.parcel_icon}/>
               <div>
                 <p className="order-item-food">
                  {order.items.map((item,index)=>{
                     if(index == order.items.length-1) {
                       return item.name + " x " + item.quantity
                     }
                     else {
                      return item.name + " x " + item.quantity+", "
                     }
                  })} 
                 </p>
               </div>
            </div>
          })}
        </div>
    </div>
  )
}

export default Order
