import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateAdmin } from '../slices/adminSlice';

function Navbar() {
  const game = useSelector(state => state.game.value);
  const admin = useSelector(state => state.admin.value);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-around px-4 border-b-2 border-slate-500'>
        <Link to='/'>Home</Link>
        <div className='flex justify-between'>
            <Link to='/customcards'>Cardpacks</Link>
            {!admin && <Link to='/admin'>Login</Link>}
            {admin && <button onClick={() => {
                fetch('http://localhost:3000/sessions', {method: 'DELETE', mode: 'cors'});
                dispatch(updateAdmin(null));
              }}>
                Logout
              </button>
            }
            {game && <Link to={`/games/${game.url}`}>Your Game</Link>}
            <Link to='/games'>All Games</Link>
        </div>
    </div>
  )
}

export default Navbar