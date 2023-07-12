import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayer } from '../slices/playerSlice';
import { redirect } from 'react-router-dom';
import { updateGame } from '../slices/gameSlice';

function PlayerModal({show, hostOrJoin}) {
  const [name, setName] = useState('');
  const game = useSelector(state => state.game.value);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/players', {
      method: 'POST',
      data: {
        name
      },
      mode: 'cors'
    });

    const playerData = await response.json();
    dispatch(updatePlayer(playerData));
    
    if(hostOrJoin == 'join') {
      redirect('/games')
    } else if(hostOrJoin == 'host') {
      hostGame();
    }
  }

  const hostGame = async () => {
    const response = await fetch('http://localhost:3000/games', {
      method: 'POST',
      mode: 'cors',
      data: {url: Math.random() * 1000000}
    });
    
    const gameData = await response.json();
    dispatch(updateGame(gameData));
    redirect(`/games/${game.url}`);
  }

  return (
    <div className='w-screen h-screen bg-black opacity-50 z-10 flex justify-center items-center'>
        <div className='z-20 max-w-xs relative p-2 text-white bg-sky-600'>
            <p className='absolute top-0 right-0' onClick={() => show(false)}> X </p>
            <h2 className='my-4'>Crerate Player</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Username: </label>
                <div className='flex items-center'>
                    <input type='text' id='name' className='p-2 bg-white rounded-md text-black' onChange={e => setName(e.target.value)} />
                    <button type='submit' className='ml-4 rounded-md border-2 border-white hover:bg-white hover:text-black'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default PlayerModal
