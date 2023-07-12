import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'react-router-dom';

function CardManager() {
  const admin = useSelector(state => state.admin.value);
  const [cardpacks, setCardpacks] = useState([]);
  const [activePack, setActivePack] = useState();
  const [whiteCards, setWhiteCards] = useState([]);
  const [blackCards, setBlackCards] = useState([]);
  const [currentCardId, setCurrentCardId] = useState();
  const [currentCard, setCurrentCard] = useState({});

  useEffect(async () => {
    if(!admin) {
      redirect('/');
      return;
    }

    const response = await fetch('http://localhost:3000/cardpacks', {mode: 'cors', body: {admin: admin.id}});
    const cardpacksData = await response.json();
    setCardpacks(cardpacksData);
  }, [cardpacks]);

  useEffect(() => {
    const currentCardpack = cardpacks.filter(cardpack => cardpack.id == activePack);
    setWhiteCards(currentCardpack.white_cards);
    setBlackCards(currentCardpack.black_cards);
  }, [activePack]);

  useEffect(() => {
    const card = blackCards.filter(black => black.id == currentCardId);
    if(card) {
      setCurrentCard(card);
      return;
    }
    card = whiteCards.filter(white => white.id == currentCard);
    setCurrentCard(card);
  }, [currentCardId]);

  const deleteCard = () => {
    let type;
    if (currentCard.white_number) {
      type = 'blackcards';
    } else {
      type = 'whitecards';
    }
    fetch(`http://localhost:3000/${type}/${currentCard.id}`, {mode: 'cors', method: 'DELETE'});
  }

  const handleSubmit = e => {
    e.preventDefault();
    const whiteOrBlack = currentCard.white_number ? 'black' : 'white';
    const method = currentCardId ? 'PUT' : 'POST';
    const body = currentCard.white_number ? {
      card: {
        white_number: currentCard.white_number,
        content: currentCard.content
      }
    } : {content: currentCard.content}
    fetch(`http://localhost:3000/${whiteOrBlack}_cards`, {
      method,
      mode: 'cors',
      body
    });
  }

  return (
    <div className='flex'>
      <div className='w-52 overflow-scroll border-r-2 border-slate-500'>
        {whiteCards.map(card => {
          <div className='p-4 bg-white border-b-2 border-slate-500 cursor-pointer' key={card.id} id={card.id} onClick={e => setCurrentCardId(e.target.id)}> {card.content} </div>
        })}
        {blackCards.map(card => {
          <div className='p-4 bg-black text-white border-b-2 border-slate-500 cursor-pointer' key={card.id} id={card.id} onClick={e => setCurrentCardId(e.target.id)}> {card.content} </div>
        })}
      </div>
      <div className=''>
        <div className='m-4'>
          <button className='p-4 bg-black text-white rounded-sm mr-2' onClick={() => {
            setCurrentCard({content: '', white_number: 1});
            setCurrentCardId(null);
            }}> New Black </button>
          <button className='p-4 bg-white rounded-sm border-2 mr-2' onClick={() => {
            setCurrentCard({content: ''});
            setCurrentCardId(null);
            }}> New White </button>
          <button className='p-4 bg-red-500 text-white rounded-sm mr-2' onClick={deleteCard}> Delete </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mx-auto my-12 rounded-sm p-2 bg-white border-2'>
            <textarea name='content' className='p-2 mx-auto' cols='24' rows='6' value={currentCard.content}></textarea>
            {currentCard.white_number && <select name='whites'>
                <option value='1'> 1 </option>
                <option value='2'> 2 </option>
                <option value='3'> 3 </option>
                white cards
              </select>}
          </div>
          <button type='submit' className='p-4 bg-sky-600 rounded-sm text-white relative right-10'> Save </button>
        </form>
      </div>
      <div className='w-52 overflow-scroll border-l-2 border-slate-500'>
        {cardpacks.map(cardpack => {
          <div className={`${active == this.id ? 'bg-sky-800' : 'bg-sky-600'} p-4 text-white border-b-2 border-slate-500 cursor-pointer`} 
            key={cardpack.id} onClick={e => setActivePack(e.target.id)} id={cardpack.id}> {cardpack.name} </div>
        })}
        <button className='p-4 bg-white rounded-sm border-2 mr-2'> New White </button>
      </div>
    </div>
  )
}

export default CardManager