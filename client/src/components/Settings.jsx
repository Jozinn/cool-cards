import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Settings() {
  const [variant, setVariant] = useState('base');

  const base = () => {
    return (
      <>
        <div className='flex jusitfy-between items-center hover:bg-sky-800'>
          <div>
            <p>Gameplay</p>
            <p className='text-xs text-slate-200'>Change how the game is played</p>
          </div>
          <p className='text-xs'>Edit</p>
        </div>
        <div className='flex justify-between items-center hover:bg-sky-800'>
          <div>
            <p>Card Packs</p>
            <p className='text-xs text-slate-200'>Change included card packs</p>
          </div>
          <p className='text-xs'>Edit</p>
        </div>
      </>
    );
  }

  const gameplay = () => {
    return (
      <form>
        <div className='flex justify-between items-center mt-8 border-2 border-slate-500'>
          <div>
            <p>Allow write-ins</p>
            <p className='text-xs text-slate-200'>When enabled, everyone will have one card that can be used as write-in card for every hand.</p>
          </div>
          <label className='inline-flex relative items-center cursor-pointer'>
            <input type='checkbox' value='' className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
          </label>
        </div>
        <div className='flex justify-between items-center mt-8 border-2 border-slate-500'>
          <div>
            <p>Owner is Judge</p>
            <p className='text-xs text-slate-200'>Make th owner the Judge at all times.</p>
          </div>
          <label className='inline-flex relative items-center cursor-pointer'>
            <input type='checkbox' value='' className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
          </label>
        </div>
        <div className='flex justify-between items-center mt-8 border-2 border-slate-500'>
          <div>
            <p>Winner Becomes Judge</p>
            <p className='text-xs text-slate-200'>Make the winner of the last round become the Judge for the next round.</p>
          </div>
          <label className='inline-flex relative items-center cursor-pointer'>
            <input type='checkbox' value='' className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
          </label>
        </div>
        <div className='mt-8 border-2 border-slate-500'>
          <label>
            <p>Round Timeout: 60 seconds</p>
            <p className='text-xs text-slate-200'>After this time, anyone who has not chosen a card will have one played at random automatically.</p>
            <input type='range' step='5' value='60' max='90' className='my-4 mx-auto' />
          </label>
        </div>
        <div className='mt-8 border-2 border-slate-500'>
          <label>
            <p>Rounds required to win: 12</p>
            <p className='text-xs text-slate-200'>The game will end if a player wins this many rounds.</p>
            <input type='range' value='12' max='25' min='1' className='my-4 mx-auto' />
          </label>
        </div>
        <div className='mt-8 border-2 border-slate-500'>
          <label>
            <p>Player limit: 10</p>
            <p className='text-xs text-slate-200'>The maximum number of players for this game.</p>
            <input type='range' value='10' min='3' max='20' className='my-4 mx-auto' />
          </label>
        </div>
      </form>
    );
  }

  const cardpacks = () => {
    return (
      <>
        <div className='mt-8 border-b-2 border-slate-500 flex justify-between items-center'>
          <p>Basic Cards</p>
          <label className='inline-flex relative items-center cursor-pointer'>
            <input type='checkbox' value='' className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
          </label>
        </div>
        <div className='mt-8 border-b-2 border-slate-500 flex justify-between items-center'>
          <h3>Add pack by code</h3>
          <p>Browse <Link to='/customcards'>Custom Cards</Link> to find a pack you like, copy its code, and add it here</p>
          <form>
            <input type='text' placeholder='pack code' className='p-2 bg-white text-black border-black border rounded-md' />
            <button type='submit' className='ml-4 rounded-md border-2 border-white hover:bg-white hover:text-black'>Add pack</button>
          </form>
        </div>
      </>
    );
  }

  return (
    <div className='w-screen h-screen bg-black opacity-50 z-10 flex justify-center items-center'>
      <div className='z-20 max-w-xs max-h-96 overflow-scroll relative p-2 text-white bg-sky-600'>
        <div className='absolute top-0 right-0'> X </div>
        <h2 className='my-4'>Settings</h2>
        {variant == 'base' && base}
        {variant == 'gameplay' && gameplay}
        {variant == 'cardpacks' && cardpacks}
      </div>
    </div>
  )
}

export default Settings