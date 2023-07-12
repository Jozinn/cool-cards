import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Games from './components/Games';
import Game from './components/Game';
import Admin from './components/Admin';
import CardManager from './components/CardManager';
import CustomCards from './components/CustomCards';
import Home from './components/Home';

function App() {
  return (
    <div className='bg-slate-200 flex justify-between items-center font-helvetica'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/games/:id' element={<Game />} />
          <Route distinct path='/games' element={<Games />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/cardmanager' element={<CardManager />} />
          <Route path='/customcards' element={<CustomCards />} />
          <Route distinct path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App
