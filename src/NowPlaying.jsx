import axios from "axios";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router";

function NowPlaying() {
  const [movieNowPlaying, setMovieNowPlaying] = useState([]);

  const fetchNowPlaying = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=1b074e6381e134256262bd2ad50cf047"
      );
      console.log(data.results);

      setMovieNowPlaying(data.results);
    } catch (error) {
      console.error("Error in fetching NowPlaying movies", error);
    }
  };
  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return (
    <div className="font-Raleway relative">
      <div className="relative z-20 flex items-center mt-16 pl-10 text-2xl font-bold text-white">
        <h1>Now Playing</h1>
        <MdKeyboardArrowRight />
      </div>

      <div className="absolute z-10 left-0 top-20 h-full w-32 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
      <div className="absolute z-10 right-0 top-20 h-full w-32 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none"></div>

      <div className="relative flex overflow-x-scroll scroll-smooth space-x-10 pl-10 pr-5 py-5 mt-5 [&::-webkit-scrollbar]:hidden flex-nowrap">
        {movieNowPlaying.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            state={{ from: "/" }}
            key={movie.id} // ✅ go back to homepage
          >
            <div
              
              className="flex-shrink-0 w-40 min-w-[200px] cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                className="w-full h-auto rounded-lg hover:outline-2 hover:outline-white hover:outline-offset-2  transition-transform duration-400 hover:scale-105"
                alt={movie.title}
              />
              <h2 className="text-white text-md font-semibold mt-4 text-center">
                {movie.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NowPlaying;
