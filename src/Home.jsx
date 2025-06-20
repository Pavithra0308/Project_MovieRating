import MovieSlide from "./MovieSlide"
import NavBar from "./NavBar"
import NowPlaying from "./NowPlaying"
import PopularMovies from "./PopularMovies"
import TopRated from "./TopRated"
import UpcomingMovies from "./UpcomingMovies"

function Home() {
  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <NavBar/>
      <MovieSlide/>
      <NowPlaying/>
      <PopularMovies/>
      <TopRated/>
      <UpcomingMovies/>
    </div>
  )
}

export default Home