import './App.css';
import Navbar from './components/Navbar';
import About from './components/About'
import Home from './components/Home'
import { HashRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
        < Route exact path="/Home" element={<Home />} />
          < Route exact path="/About" element={<About />} />
        </Routes>
      </HashRouter>

    </>

  );
}

export default App;
