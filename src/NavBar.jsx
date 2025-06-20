import { CiSearch } from "react-icons/ci";
import { BiSolidCameraMovie } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function NavBar() {
  const [genreList, setGenreList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Create separate state for search results

  const navigate = useNavigate();

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=1b074e6381e134256262bd2ad50cf047"
      );
      setGenreList(data.genres || []);
    } catch (error) {
      console.error("Error in fetching genres", error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=1b074e6381e134256262bd2ad50cf047&query=${searchTerm}`
      );
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/movies?search=${searchTerm.trim()}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-10 w-full font-Raleway bg-gradient-to-r from-black to-zinc-700 flex p-5 items-center justify-between text-white">
      <div className="flex gap-x-8 items-center">
        <div className="flex gap-2 items-center">
          <BiSolidCameraMovie className="text-2xl" />
          <h1
            className="text-white cursor-pointer text-3xl font-Raleway font-bold"
            onClick={() => window.location.reload()}
          >
            Cineva
          </h1>
        </div>
        <div>
          <div className="md:w-96 flex items-center relative">
            <input
              type="text"
              className="peer text-xs pl-5 w-full h-9 rounded-full focus:outline-none bg-zinc-800 focus:bg-gray-100 focus:text-gray-900"
              placeholder="Search for movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={fetchSearchResults}
              onKeyDown={handleSearchKeyDown}
            />

            <CiSearch
              className="cursor-pointer size-5 absolute right-5 text-white peer-focus:text-black transition-colors duration-200"
              onClick={() => navigate(`/movies?search=${searchTerm.trim()}`)}
            />
          </div>

          {searchResults.length > 0 && (
            <div className="absolute mt-2 bg-zinc-800 text-white rounded-lg w-full p-2">
              {searchResults.map((movie) => (
                <p
                  key={movie.id}
                  className="p-2 hover:bg-zinc-700 cursor-pointer"
                >
                  {movie.title}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-white flex gap-10 items-center">
        <ul className="flex gap-10">
          {/* <li
            className="cursor-pointer hover:underline hover:underline-offset-4"
            onClick={() => navigate("/home")}
          >
            Home
          </li> */}
          <li
            className="cursor-pointer hover:underline hover:underline-offset-4"
            onClick={() => navigate("/movies")}
          >
            Movies
          </li>
        </ul>
        <select
          className="bg-zinc-800 text-white rounded px-2 py-1"
          value={selectedGenre}
          onChange={(e) => {
            const genreId = e.target.value;
            const genreName = genreList.find(
              (g) => g.id.toString() === genreId
            )?.name;
            setSelectedGenre(genreId);
            navigate(`/movies?genre=${genreId}`, {
              state: { genreName },
            });
          }}
        >
          <option value="" hidden>
            Genre
          </option>
          {genreList.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-5"></div>
    </div>
  );
}

export default NavBar;
