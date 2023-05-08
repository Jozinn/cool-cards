import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex justify-around px-4 border-b-2 border-slate-500'>
        <Link to='/'>Home</Link>
        <div className='flex justify-between'>
            <Link to='/customcards'>Cardpacks</Link>
            <Link to='/admin'>Login</Link>
        </div>
    </div>
  )
}

export default Navbar