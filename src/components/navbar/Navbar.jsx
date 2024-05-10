import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className="nav-container">
         <ul className='nav-ul'>
              <li className='nav-li'>
                <NavLink to="/" > Home Page </NavLink>
              </li>
              <li className='nav-li'>
                <NavLink to="/addproduct" >Add Product </NavLink>
              </li>
              <li className='nav-li'>
                <NavLink to="/category" >Categories </NavLink>
              </li>
              <li className='nav-li'>
                <NavLink to="/brand" >Brands </NavLink>
              </li>
            </ul>
    </div>
  )
}

export default Navbar