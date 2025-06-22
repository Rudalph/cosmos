import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import APOD from './pages/APOD';
import NasaMediaSearch from './pages/NasaMediaSearch';
import Neows from './pages/Neows';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/APOD" element={<APOD  />} />
          <Route path="/NasaMediaSearch" element={<NasaMediaSearch  />} />
          <Route path="/Neows" element={<Neows  />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
