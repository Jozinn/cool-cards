import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateGame } from '../slices/gameSlice';

function Settings({show}) {
  const [variant, setVariant] = useState('base');
  const [gameplaySettings, setGameplaySettings] = useState({});
  const [packsList, setPacksList] = useState([]);
  const [packCode, setPackCode] = useState();
  const dispatch = useDispatch();
  const game = useSelector(state => state.game.value);

  useEffect(async () => {
    const response = await fetch(`http://localhost:3000/games/${game.id}`, {mode: 'cors'});
    const gameData = await response.json();
    updateGame(gameData);
  }, [variant]);

  const changeGameplay = e => {
    const field = e.target;
    setGameplaySettings({
      [field.name]: field.value
    });
  }

  const submitGameplay = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/gameplays/${game.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        gameplay: gameplaySettings
      }
    });

    const gameData = await response.json();
    dispatch(updateGame(gameData));
  }

  const submitPacksList = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/cardpacks/${packCode}`, {mode: 'cors'});
    const cardpackData = await response.json();
    setPacksList([...packsList, cardpackData]);
  }

  const addOrRemoveCardpack = e => {
    const pack = e.target.name;
    const checked = e.target.value;

    if(checked) {
      fetch(`http://localhost:3000/settings/${game.id}`, {
        method: 'PUT',
        mode: 'cors',
        body: {
          cardpack: pack,
          action: 'add'
        }
      });
    } else {
      fetch(`http://localhost:3000/settings/${game.id}`, {
        method: 'PUT',
        mode: 'cors',
        body: {
          cardpack: pack,
          action: 'delete'
        }
      });
    }
  }

  const base = () => {
    return (
      <>
        <div className='flex jusitfy-between items-center hover:bg-sky-800'>
          <div>
            <p>Gameplay</p>
            <p className='text-xs text-slate-200'>Change how the game is played</p>
          </div>
          <p className='text-xs cursor-pointer hover:bg-slate-500' onClick={() => setVariant('gameplay')}>Edit</p>
        </div>
        <div className='flex justify-between items-center hover:bg-sky-800'>
          <div>
            <p>Card Packs</p>
            <p className='text-xs text-slate-200'>Change included card packs</p>
          </div>
          <p className='text-xs cursor-pointer hover:bg-slate-500' onClick={() => setVariant('cardpacks')}>Edit</p>
        </div>
      </>
    );
  }

  const gameplay = () => {
    return (
      <form onSubmit={submitGameplay}>
        <div className='flex justify-between items-center mt-8 border-2 border-slate-500'>
          <div>
            <p>Allow write-ins</p>
            <p className='text-xs text-slate-200'>When enabled, everyone will have one card that can be used as write-in card for every hand.</p>
          </div>
          <label className='inline-flex relative items-center cursor-pointer'>
            <input type='checkbox' value='' onChange={changeGameplay} name='write_ins' className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
          </label>
        </div>
        <div className='flex justify-between items-center mt-8 border-2 border-slate-500'>
          <div>
            <p>Owner is Judge</p>
            <p className='text-xs text-slate-200'>Make th owner the Judge at all times.</p>
          </div>
          <label className='inline-flex relative items-center cursor-pointer'>
            <input type='checkbox' value='' onChange={changeGameplay} name='host_judge' className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
          </label>
        </div>
        <div className='flex justify-between items-center mt-8 border-2 border-slate-500'>
          <div>
            <p>Winner Becomes Judge</p>
            <p className='text-xs text-slate-200'>Make the winner of the last round become the Judge for the next round.</p>
          </div>
          <label className='inline-flex relative items-center cursor-pointer'>
            <input type='checkbox' value='' onChange={changeGameplay} name='winner-judge' className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
          </label>
        </div>
        <div className='mt-8 border-2 border-slate-500'>
          <label>
            <p>Round Timeout: 60 seconds</p>
            <p className='text-xs text-slate-200'>After this time, anyone who has not chosen a card will have one played at random automatically.</p>
            <input type='range' step='5' va onChange={changeGameplay}lue='60' max='90' name='timeout' className='my-4 mx-auto' />
          </label>
        </div>
        <div className='mt-8 border-2 border-slate-500'>
          <label>
            <p>Rounds required to win: 12</p>
            <p className='text-xs text-slate-200'>The game will end if a player wins this many rounds.</p>
            <input type='range' value='12'  onChange={changeGameplay}max='25' min='1' name='points_to_win' className='my-4 mx-auto' />
          </label>
        </div>
        <div className='mt-8 border-2 border-slate-500'>
          <label>
            <p>Player limit: 10</p>
            <p className='text-xs text-slate-200'>The maximum number of players for this game.</p>
            <input type='range' value='10'  onChange={changeGameplay}min='3' max='20' name='players_limit' className='my-4 mx-auto' />
          </label>
        </div>
        <button type='submit' className='ml-4 rounded-md border-2 border-white hover:bg-white hover:text-black'>Submit</button>
      </form>
    );
  }

  const cardpacks = () => {
    return (
      <>
        {packsList.map(pack =>{
          <div className='mt-8 border-b-2 border-slate-500 flex justify-between items-center'>
            <p>Basic Cards</p>
            <label className='inline-flex relative items-center cursor-pointer'>
              <input type='checkbox' value='' name={pack.id} className='sr-only peer' />
              <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
            </label>
          </div>
        })}
        <div className='mt-8 border-b-2 border-slate-500 flex justify-between items-center'>
          <h3>Add pack by code</h3>
          <p>Browse <Link to='/customcards'>Custom Cards</Link> to find a pack you like, copy its code, and add it here</p>
          <form onSubmit={submitPacksList}>
            <input type='text' placeholder='pack code' className='p-2 bg-white text-black border-black border rounded-md' onChange={e => setPackCode(e.target.value)} />
            <button type='submit' className='ml-4 rounded-md border-2 border-white hover:bg-white hover:text-black'>Add pack</button>
          </form>
        </div>
      </>
    );
  }

  return (
    <div className='w-screen h-screen bg-black opacity-50 z-10 flex justify-center items-center'>
      <div className='z-20 max-w-xs max-h-96 overflow-scroll relative p-2 text-white bg-sky-600'>
        <div className='absolute top-0 right-0' onClick={() => show(false)}> X </div>
        <h2 className='my-4'>Settings</h2>
        {variant == 'base' && base}
        {variant == 'gameplay' && gameplay}
        {variant == 'cardpacks' && cardpacks}
      </div>
    </div>
  )
}

export default Settings