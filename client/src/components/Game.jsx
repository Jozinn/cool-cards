import React, { useState } from 'react'

function Game() {
  const [stage, setStage] = useState('wait_game')
  
  return (
    <div>
      {stage == 'wait_game' && <>
        <p>Players</p>
        <p className='text-xs text-slate-500'>(5 / 12 max)</p>
        <div className='text-xs mx-auto my-3'>
          <div className='flex justify-between p-4 border-b-2 border-slate-500'>
            <p>Name</p>
            <p className='cursor-pointer rounded-sm hover:bg-slate-500'>Leave Game</p>
          </div>
          <div className='flex justify-between p-4 border-b-2 border-slate-500'>
            <p>Name</p>
            <p className='cursor-pointer rounded-sm hover:bg-slate-500'>Remove Player</p>
          </div>
          <div className='flex justify-between p-4 border-b-2 border-slate-500'>
            <p>Name</p>
            <p className='cursor-pointer rounded-sm hover:bg-slate-500'>Remove Player</p>
          </div>
        </div>
        <div className='bg-sky-600 rounded-xs text-white mx-auto my-8 p-3'>
          <p>Invite Players:</p>
          <p className='border-2 rounded-lg p-4 bg-white text-black'>
            cool.cards/games/dsdasdsdsda
            <span className='rounded-full bg-sky-600 text-white relative right-0'>Copy</span>
          </p>
        </div>
        <div className='mx-8 my-auto p-3 text-center text-xl cursor-pointer text-white bg-black rounded-xs'>
          Start Game!
        </div>
        <div className='mx-8 my-auto p-3 text-center text-xl curosr-pointer bg-white border-black border-2 rounded-xs'>
          Game Settings
        </div>
      </>}
    </div>
  )
}

export default Game