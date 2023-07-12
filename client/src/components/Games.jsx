import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Games() {
  const [games, setGames] = useState([]);
  const player = useSelector(state => state.player.value);

  useEffect(async () => {
    if(!player) {
      redirect('/');
      return;
    }
    const data = await fetch('http://localhost:3000/games', {mode: 'cors'});
    const games = await data.json();
    setGames(games);
  }, []);

  return (
    <div>
      <p className='mt-2 mb-6'>Available Games</p>
      <div className='grid grid-cols-game gap-4'>
        {games.map(game => {
          <div className='bg-sky-600 rounded-sm p-2 shadow-sm shadow-slate-500 text-white'>
            {game.url}
            <p className='text-slate-200 text-xs'>{game.players.length} / {game.settings.gameplay.players_limit} Players</p>
            <div className='mt-4 border-b-2 border-slate-200'></div>
            <div className='text-right mt-4 hover:bg-sky-800'>
              <Link to={`/games/${game.url}`}>Play</Link>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Games