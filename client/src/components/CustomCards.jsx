import React, { useEffect, useState } from 'react'

function CustomCards() {
  const copy = e => {
    const code = e.target.previousSibling.textContent;
    navigator.clipboard.writeText(code);
  }

  const [cardpacks, setCardpacks] = useState([]);

  useEffect(async () => {
    const data = await fetch('http://localhost:3000/cardpacks', {mode: 'cors'});
    const cardpacks = await data.json();
    setCardpacks(cardpacks);
  }, []);

  return (
    <div>
      <p className='mt-2 mb-6'>Browse Custom Card Packs</p>
      <div className='grid grid-cols-game gap-4'>
        {cardpacks.map(cardpack => {
          <div className='bg-sky-600 rounded-sm p-2 shadow-sm shadow-slate-500 text-white'>
            {cardpack.name}
            <p className='text-slate-200 text-xs'>B:<span className='font-bold'>{cardpack.black_cards}</span>  W:<span className='font-bold'>{cardpack.white_cards}</span></p>
            <div className='flex gap-2 items-center'>
              <p className='text-2xl font-bold mx-8'>{cardpack.id}</p>
              <button className='p-2 rounded-full text-xs bg-sky-700 hover:bg-sky-800' onClick={copy} >Copy Pack Code</button>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default CustomCards