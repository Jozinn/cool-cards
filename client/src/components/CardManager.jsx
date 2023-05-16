import React from 'react'

function CardManager() {
  return (
    <div className='flex'>
      <div className='w-52 overflow-scroll border-r-2 border-slate-500'>
        <div className='p-4 bg-white border-b-2 border-slate-500 cursor-pointer'> Card </div>
        <div className='p-4 bg-white border-b-2 border-slate-500 cursor-pointer'> Card </div>
        <div className='p-4 bg-black text-white border-b-2 border-slate-500 cursor-pointer'> Card </div>
        <div className='p-4 bg-black text-white border-b-2 border-slate-500 cursor-pointer'> Card </div>
      </div>
      <div className=''>
        <div className='m-4'>
          <button className='p-4 bg-black text-white rounded-sm mr-2'> New Black </button>
          <button className='p-4 bg-white rounded-sm border-2 mr-2'> New White </button>
          <button className='p-4 bg-red-500 text-white rounded-sm mr-2'> Delete </button>
        </div>
        <form>
          <div className='mx-auto my-12 rounded-sm p-2 bg-white border-2'>
            <textarea name='content' className='p-2 mx-auto' cols='24' rows='6'></textarea>
            <select name='whites'>
              <option value='1'> 1 </option>
              <option value='2'> 2 </option>
              <option value='3'> 3 </option>
            </select> white cards
          </div>
          <button type='submit' className='p-4 bg-sky-600 rounded-sm text-white relative right-10'> Save </button>
        </form>
      </div>
      <div className='w-52 overflow-scroll border-l-2 border-slate-500'>
        <div className='p-4 bg-sky-600 text-white border-b-2 border-slate-500 cursor-pointer'> Cardpack </div>
        <div className='p-4 bg-sky-600 text-white border-b-2 border-slate-500 cursor-pointer'> Cardpack </div>
        <div className='p-4 bg-sky-600 text-white border-b-2 border-slate-500 cursor-pointer'> Cardpack </div>
      </div>
    </div>
  )
}

export default CardManager