import './App.css';
import Navbar from './components/Navbar';
import About from './components/About'
import Home from './components/Home'
import { HashRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/noteState';
function App() {
  return (
    <>
      <NoteState>
        <HashRouter>
          <Navbar />
          <Routes>
            < Route exact path="/Home" element={<Home />} />
            < Route exact path="/About" element={<About />} />
          </Routes>
        </HashRouter>
      </NoteState>

    </>

  );
}

export default App;
