import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"
const Verify = () => {

    const [searchParams, setSerachParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()
    const VerifyPayment = async() =>{
      console.log(success,orderId)
      const response = await axios.post(url+"/api/order/verify",{orderId,success})
        console.log(response)
        if(response.data.success) {
            console.log("HERE")
            navigate("/myorders")
        }
        else {
            navigate("/")
        }
    }
    useEffect(()=>{
        VerifyPayment()
    },[])

  return (
    <div>
      <div className="verify">
        <div className="spinner">

        </div>
      </div>
    </div>
  )
}

export default Verify
