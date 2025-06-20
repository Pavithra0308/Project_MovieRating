import axios from "axios";
import { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router";

function MovieList() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreId = queryParams.get("genre");
  const searchTerm = queryParams.get("search");
  const genreName = location.state?.genreName || null;

  const [movies, setMovies] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);

  const fetchMovieByGenre = async () => {
    try {
      let url = "";
      if (genreId) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=1b074e6381e134256262bd2ad50cf047&with_genres=${genreId}&page=${page}`;
      } else if (searchTerm) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=1b074e6381e134256262bd2ad50cf047&query=${searchTerm}&page=${page}`;
      } else {
        // fetch popular or discover all
        url = `https://api.themoviedb.org/3/discover/movie?api_key=1b074e6381e134256262bd2ad50cf047&page=${page}`;
       
      }

      if (url) {
        const { data } = await axios.get(url);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };
  

  useEffect(() => {
    fetchMovieByGenre();
  }, [genreId, searchTerm,page]);

  return (
    <div className="bg-black min-h-screen p-10">
      <h2 className="text-white text-center font-extrabold font-Bebas text-4xl tracking-wide">
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : genreName || "Movies"}
      </h2>
      <button
        className="flex items-center font-playfair bg-white/20 text-white border border-white px-4 py-2 mb-10 mr-20 rounded hover:bg-white/30 transition"
        onClick={() => navigate("/home")}
      >
        <IoIosArrowRoundBack className="size-5" />
        <span>Back to Home</span>
      </button>
      <div className="flex flex-wrap justify-center gap-x-10 mt-10">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            state={{ from: location.pathname + location.search, genreName }}
            key={movie.id}
          >
            <div
              key={movie.id}
              className="flex-shrink-0 md:w-52 w-38 mt-10 cursor-pointer"
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
      <div className="flex justify-center items-center space-x-4 mt-10 font-playfair">
              <button className="border px-4 py-2 bg-white/20 hover:bg-white/30 rounded cursor-pointer"
              onClick={()=>setPage((prev)=>Math.max(prev-1),1)}
              disabled={page===1}
              >Prev</button>
              <span>Page {page}/{totalPages} </span>
              <button className="border px-4 py-2 bg-white/20 hover:bg-white/30  rounded cursor-pointer"
              onClick={()=>setPage((prev)=>prev+1)}
              disabled={page===totalPages}
              >Next</button>
            </div>
    </div>
  );
}

export default MovieList;
