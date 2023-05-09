import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Games from './components/Games';
import Game from './components/Game';
import Admin from './components/Admin';
import CardManager from './components/CardManager';
import CustomCards from './components/CustomCards';

function App() {
  return (
    <div className='bg-slate-200 flex flex-col justify-between items-center font-helvetica'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/game/:id' element={<Game />} />
          <Route path='/games' element={<Games />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/cardmanager' element={<CardManager />} />
          <Route path='/customcards' element={<CustomCards />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App
