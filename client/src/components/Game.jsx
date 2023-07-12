import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
import Settings from './Settings';
import { updatePlayer } from '../slices/playerSlice';
import { updateGame } from '../slices/gameSlice';

function Game() {
  const [stage, setStage] = useState('wait_game');
  const [showSettings, setShowSettings] = useState(false);
  const [board, setBoard] = useState([]);
  const game = useSelector(state => state.game.value);
  const player = useSelector(state => state.player.value);
  const dispatch = useDispatch();

  useEffect(async () => {
    if(!player) {
      redirect('/');
      return;
    }
    
    const pathArr = window.location.pathname.split('/');
    const gameId = pathArr[1];

    const response = await fetch(`http://localhost:3000/games/${gameId}`, {mode: 'cors'});
    const gameData = await response.json();
    dispatch(updateGame(gameData));

    if(!player.game_id) {
      dispatch(updatePlayer({...player, game_id: game.id}));
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/players/${player.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        player
      }
    }).then(res => res.json()).then(data => dispatch(updatePlayer(data)));
  }, [player]);

  useEffect(() => {
    fetch(`http://localhost:3000/games/${game.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        game
      }
    }).then(res => res.json())
      .then(data => dispatch(updateGame(data)))
      .then(() => {
        const playerExist = game.players.filter(p => p.id == player.id);
        if (!playerExist) redirect('/');
      });
  }, [game]);

  const copy = e => {
    const code = e.target.previousSibling.textContent;
    navigator.clipboard.writeText(code);
  }

  const leaveRemoveMsg = fplayer => {
    if(fplayer.id == player.id) {
      return 'Leave game';
    } else if (player.is_host) {
      return 'Remove player';
    }

    return '';
  }

  const leaveRemoveFunc = fplayer => {
    const msg = leaveRemoveMsg(fplayer);
    if (msg == 'Leave game') {
      leaveGame();
    } else if (msg == 'Remove player') {
      removePlayer(fplayer);
    }
  }

  const leaveGame = () => {
    dispatch(updatePlayer({...player, game_id: null}));
    redirect('/');
  }

  const removePlayer = (playerId) => {
    const newPlayerList = game.players.filter(player => player.id != playerId);
    fetch(`http://localhost:3000/games/${game.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        game: {
          players: newPlayerList
        }
      }
    }).then(res => res.json()).then(data => dispatch(updateGame(data)));
  } //TODO

  const start = () => fetch(`http://localhost:3000/games/${game.id}/start`);

  const skipBlackCard = () => {
    fetch(`http://localhost:3000/games/${game.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        setBlack: true
      }
    }).then(res => res.json()).then(data => dispatch(updateGame(data)));
  }

  const startRound = () => {
    fetch(`http://localhost:3000/games/${game.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        game: {
          stage: 'play'
        }
      }
    }).then(res => res.json()).then(data => dispatch(updateGame(data)));
  }

  const playCard = async card => {
    const reponse = await fetch(`http://localhost:3000/players/${player.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        play: true,
        card: card.id
      }
    });
    const playdata = await response.json();
    setBoard([...board, {...playdata, owner: player.id}]);
    for(player of game.players) {
      if(!player.played) return;
    }
    fetch(`http://localhost:3000/games/${game.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        game: {
          stage: 'showup'
        }
      }
    }).then(res => res.json()).then(data => dispatch(updateGame(data)));
  }

  const chooseWinner = card => {
    const winner = card.owner;
    const winczar = game.settings.gameplay.winner_judge;
    fetch(`http://localhost:3000/players/${player.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        player: {
          is_czar: !winczar 
        }
      }
    }).then(res => res.json).then(data => dispatch(updatePlayer(data)));
    fetch(`http://localhost:3000/players/${winner.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: {
        player: {
          is_czar: winczar,
          score: score + 1
        }
      }
    });
    setTimeout(() => {
      setBoard([]);
      fetch(`http://localhost:3000/games/${game.id}`, {
        method: 'PUT',
        mode: 'cors',
        body: {
          game: {
            stage: 'wait_round'
          }
        }
      });
    }, 10000);
  }
  
  return (
    <div>
      {stage == 'wait_game' && <>
        <p>Players</p>
        <p className='text-xs text-slate-500'>({game.players.length} / {game.settings.gameplay.player_limit} max)</p>
        <div className='text-xs mx-auto my-3'>
          {game.players.map(mapPlayer => {
            <div className='flex justify-between p-4 border-b-2 border-slate-500' key={player.id}>
              <p> {mapPlayer.name} {mapPlayer.id == player.id && '(you)'} {mapPlayer.is_host && '(owner)'} </p>
              <p className='cursor-pointer rounded-sm hover:bg-slate-500' onClick={leaveRemoveFunc}> {leaveRemoveMsg(mapPlayer)} </p>
            </div>
          })}
        </div>
        <div className='bg-sky-600 rounded-xs text-white mx-auto my-8 p-3'>
          <p>Invite Players:</p>
          <p className='border-2 rounded-lg p-4 bg-white text-black'>
            cool.cards/games/{game.id}
            <span className='rounded-full bg-sky-600 text-white relative right-0' onClick={copy}>Copy</span>
          </p>
        </div>
        <div className='mx-8 my-auto p-3 text-center text-xl cursor-pointer text-white bg-black rounded-xs' onClick={start}>
          Start Game!
        </div>
        <div className='mx-8 my-auto p-3 text-center text-xl curosr-pointer bg-white border-black border-2 rounded-xs' onClick={() => setShowSettings(true)}>
          Game Settings
        </div>
      </>}
      {stage != 'wait_game' && <>
        <div className='m-4 flex gap-2'>
          {game.players.map(mapPlayer => {
            <div className='bg-slate-800 text-white p-2 rounded-full text-xs text-center cursor-pointer hover:bg-black'>{mapPlayer.name} {mapPlayer.id == player.id && '(you)'} {mapPlayer.is_host && '(owner)'}</div>
          })}
        </div>
        <div className='border-b-2 border-slate-500 m-4'></div>
      </>}
      {stage == 'wait_round' && player.is_czar && <>
        <p className='text-xs text-center'><strong>You are the Czar!</strong></p>
        <p className='text-xs text-center'>Read the card aloud, then click the Start The Round. Once everyone plays, you will choose your favorite!</p>
        <div className='mt-6 mb-2 mx-auto bg-black text-white p-2 rounded-sm w-80 h-44'>
          {game.current_black.content}
        </div>
        <div className='mx-auto text-xs'>
          <button className='border-2 rounded-sm p-2 text-center hover:bg-white' onClick={skipBlackCard} >Skip card</button>
          <button className='rounded-sm p-2 bg-slate-800 text-center hover:bg-black' onClick={startRound} >Start round</button>
        </div>
      </>}
      {stage == 'wait_round' && !player.is_czar && 
        <div className='mt-6 mb-2 mx-auto bg-black text-white p-2 rounded-sm w-80 h-44'>
          Card Content____
        </div>
      }
      {stage == 'play' && !player.is_czar && <>
        <div className='mt-6 mb-2 mx-auto bg-black text-white p-2 rounded-sm w-80 h-44'>{game.current_black}</div>
        <div className='mx-auto grid grid-cols-game gap-4'>
          {player.white_cards.map(card => {
            <div className='bg-white shadow-sm shadow-slate-500 p-2 rounded-sm w-80 h-44'>
              <p className='px-4'>{card.content}</p>
              <div className='border-b-2 border-slate-500'></div>
              <button className='absolute bottom-0 left-0 bg-slate-800 p-2 text-center text-xs text-white rounded-sm hover:bg-black' onClick={() => playCard(card.id)}>
                Play Card
              </button>
            </div>
          })}
        </div>
      </>}
      {stage =='showup' && <>
        <div className='mt-6 mb-2 mx-auto bg-black text-white p-2 rounded-sm w-80 h-44'>{game.current_black}</div>
        <div className='mx-auto grid grid-cols-game gap-4'>
          {board.map(card => {
            <div className='bg-white shadow-sm shadow-slate-500 p-2 rounded-sm w-80 h-44'>
              <p className='px-4'>{card.content}</p>
              <div className='border-b-2 border-slate-500'></div>
              {player.is_czar && <>
                <button className='absolute bottom-0 left-0 bg-slate-800 p-2 text-center text-xs text-white rounded-sm hover:bg-black' onClick={() => {
                  chooseWinner(card)
                }}>
                  Pick Winner
                </button>
              </>}
            </div>
          })}
        </div>
      </>}
      {showSettings && <Settings show={setShowSettings} />}
    </div>
  )
}

export default Game