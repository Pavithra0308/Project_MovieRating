import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { IoMdClose } from "react-icons/io";

function MovieDetail() {
  const [card, setCard] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showMsg, setShowMsg] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || "";
const back = from.includes("movies") ? from : "/home";
const backLabel = from.includes("movies") ? "Movies" : "Home";



  const fetchMovieDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=1b074e6381e134256262bd2ad50cf047`
      );
      setCard(data);

      const video = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1b074e6381e134256262bd2ad50cf047`
      );

      const trailerVideo = video.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(trailerVideo);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  useEffect(() => {
       if (!id) return;

    console.log("Fetching for ID:", id);

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="text-white font-playfair relative">
      {card && (
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${card.backdrop_path})`,
          }}
          className="bg-cover bg-center w-full min-h-screen bg-black/80 bg-blend-multiply flex flex-col justify-between py-10"
        >
          <div className="flex justify-around items-start px-10 gap-6">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w780${card.poster_path}`}
                alt={card.title}
                className="w-76 rounded-xl"
              />
            </div>

            <div className="w-1/2 relative">
              <h2 className="text-5xl font-Bebas">{card.title}</h2>
              {card.tagline && <p className="italic text-lg">{card.tagline}</p>}
              <div className="space-y-4  mt-10">
                <p>{card.overview}</p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {card.genres.map((g) => g.name).join(", ")}
                </p>
                <p>
                  <strong>Runtime:</strong> {Math.floor(card.runtime / 60)}h{" "}
                  {card.runtime % 60}m
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  {card.original_language.toUpperCase()}
                </p>
                <p>
                  <strong>Release Date:</strong> {card.release_date}
                </p>
                <p>
                  <strong>Rating:</strong> ⭐ {card.vote_average.toFixed(2)} (
                  {card.vote_count} votes)
                </p>
              </div>

              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
                >
                  Watch Trailer
                </button>
              )}
              <button
                onClick={() => setShowRating(true)}
                className="ml-4 mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-sm transition"
              >
                ⭐ Rate This Movie
              </button>
              {!showRating && userRating > 0 && (
                <p className="mt-2 text-green-400 font-semibold text-xl">
                  ✅ You rated this movie {userRating}/10
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end items-center px-10 mt-10">
            <button
              onClick={() => navigate(back)}
              className="bg-white/20 text-white border border-white px-4 py-2 mb-20 mr-20 rounded hover:bg-white/30 transition"
            >
              ⬅ Back to {backLabel}


            </button>
          </div>
        </div>
      )}

      {showTrailer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg overflow-hidden shadow-lg w-[90%] md:w-[60%] lg:w-[50%] relative">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              <IoMdClose className="size-5 mt-1 cursor-pointer" />
            </button>
            <iframe
              width="100%"
              height="400px"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Movie Trailer"
            ></iframe>
          </div>
        </div>
      )}

      {showRating && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-lg p-6 w-1/2 md:w-1/3 relative">
            <button
              onClick={() => {
                setShowRating(false);
                setShowMsg(false);
              }}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              <IoMdClose className="cursor-pointer" />
            </button>
            <h3 className="text-2xl text-center font-semibold mb-4">
              Rate "{card.title}"
            </h3>
            <div className="flex gap-1 justify-center mb-4">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => setUserRating(i + 1)}
                  className={`cursor-pointer text-3xl ${
                    userRating > i ? "text-yellow-400" : "text-gray-500"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-center mb-4 text-white">
              You rated it {userRating}/10
            </p>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  setShowMsg(true);
                  setTimeout(() => {
                    setShowMsg(false);
                    setShowRating(false);
                  }, 2000);
                }}
                className=" bg-green-600 hover:bg-green-700 px-4 py-2 rounded-sm text-white"
              >
                Submit Rating
              </button>

              <div
                className={`transition-opacity duration-500 ${
                  showMsg ? "opacity-100" : "opacity-0"
                } text-green-500 text-center px-4 py-2 font-bold text-2xl`}
              >
                Thanks for rating! 🎉
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
