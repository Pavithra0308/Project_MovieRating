import Home from "./Home";
import Banner from "./Banner";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import { Route, Routes, useLocation } from "react-router";
import NavBar from "./NavBar";

function App() {
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />

        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
