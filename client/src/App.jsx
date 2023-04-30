import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, About, Play } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="w-full h-[calc(100vh-180px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
