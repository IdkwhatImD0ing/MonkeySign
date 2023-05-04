import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Navbar} from './components'
import {Home, About, Play} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="w-full h-full relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </main>
      <img src="./corner.png" alt="corner" className="fixed bottom-0 z-[-10]" />
    </BrowserRouter>
  )
}

export default App
