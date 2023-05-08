import React from 'react'

function PlayerModal() {
  return (
    <div className='w-screen h-screen bg-black opacity-50 z-10 flex justify-center items-center'>
        <div className='z-20 max-w-xs relative p-2 text-white bg-sky-600'>
            <p className='absolute top-0 right-0'> X </p>
            <h2 className='my-4'>Crerate Player</h2>
            <form action='http://localhost:3000/players'>
                <label htmlFor='name'>Username: </label>
                <div className='flex items-center'>
                    <input type='text' id='name' className='p-2 bg-white rounded-md text-black' />
                    <button type='submit' className='ml-4 rounded-md border-2 border-white hover:bg-white hover:text-black'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default PlayerModal
