import React from 'react'
import { Link } from 'react-router-dom'

function Games() {
  return (
    <div>
      <p className='mt-2 mb-6'>Available Games</p>
      <div className='grid grid-cols-game'>
        <div className='bg-sky-600 rounded-sm p-2 shadow-sm shadow-slate-500 text-white'>
          Game name
          <p className='text-slate-200 text-xs'>6 / 12 Players</p>
          <div className='mt-4 border-b-2 border-slate-200'></div>
          <div className='text-right mt-4 hover:bg-sky-800'>
            <Link to='/game'>Play</Link>
          </div>
        </div>
        <div className='bg-sky-600 rounded-sm p-2 shadow-sm shadow-slate-500'>
          Game name
          <p className='text-slate-200 text-xs'>6 / 12 Players</p>
          <div className='mt-4 border-b-2 border-slate-200'></div>
          <div className='text-right mt-4 hover:bg-sky-800'>
            <Link to='/game'>Play</Link>
          </div>
        </div>
        <div className='bg-sky-600 rounded-sm p-2 shadow-sm shadow-slate-500'>
          Game name
          <p className='text-slate-200 text-xs'>6 / 12 Players</p>
          <div className='mt-4 border-b-2 border-slate-200'></div>
          <div className='text-right mt-4 hover:bg-sky-800'>
            <Link to='/game'>Play</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Games