import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const navbar = ({ setshowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = ()=> {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => { setMenu("home") }} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu") }} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#footer' onClick={() => { setMenu("mobile-app") }} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => { setMenu("contact-us") }} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <div className={getTotalCartAmount() > 0 ? 'dot' : ""}></div>
          <Link to='/cart'><img src={assets.basket_icon} /></Link>
        </div>
        {!token ? <button onClick={() => setshowLogin(true)}>Sign in</button>
          : <div>
              <div className="navbar-profile">
                <img src={assets.profile_icon}/>
                <ul className="navbar-profile-dropdown">
                  <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}/><p>Orders</p></li>
                  <hr/>
                  <li onClick={logout}><img src={assets.logout_icon}/><p>LogOut</p></li>
                </ul>
              </div>
          </div>
        }

      </div>
    </div>
  )
}

export default navbar
