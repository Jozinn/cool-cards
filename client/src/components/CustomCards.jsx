import React from 'react'

function CustomCards() {
  return (
    <div>
      <p className='mt-2 mb-6'>Browse Custom Card Packs</p>
      <div className='grid grid-cols-game'>
        <div className='bg-sky-600 rounded-sm p-2 shadow-sm shadow-slate-500 text-white'>
          Game name
          <p className='text-slate-200 text-xs'>B:<span className='font-bold'>69</span>  W:<span className='font-bold'>420</span></p>
          <div className='flex gap-2 items-center'>
            <p className='text-2xl font-bold mx-8'>AKSLJK</p>
            <button className='p-2 rounded-full text-xs bg-sky-700 hover:bg-sky-800'>Copy Pack Code</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomCards