import React, { useState } from 'react'
import PlayerModal from './PlayerModal';

function Home() {
  const [modalPresent, setModalPresent] = useState(false);
  const [hostOrJoin, setHostOrJoin] = useState('');

  const handleClick = action => {
    setModalPresent(true);
    setHostOrJoin(action);
  }

  return (
    <div className='mx-auto'>
        <p className='mx-auto text-center mt-8'>
            Welcome to Bad Cards clone.
            Create your own game or join an existing game
        </p>
        <div className='flex flex-wrap justify-center gap-2 mx-auto text-4xl mt-8'>
            <button className='bg-sky-600 text-white p-8 hover:bg-sky-400' onClick={() => handleClick('host')}>Create Game!</button>
            <button className='p-8 border-2 hover:bg-slate-400' onClick={() => handleClick('join')}>Join Game!</button>
        </div>
        {modalPresent && <PlayerModal exit={setModalPresent} hostOrJoin={hostOrJoin} />}
    </div>
  )
}

export default Home