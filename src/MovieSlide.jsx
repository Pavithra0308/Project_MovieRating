import React, { useEffect, useState } from "react";
import axios from "axios";
function MovieSlide() {
  const [slide, setSlide] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchMovieSlide = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/collection/10/images?api_key=1b074e6381e134256262bd2ad50cf047`
      );
      // console.log(data);
      setSlide(data.backdrops.slice(0,10));
    } catch (error) {
      console.error("Error in fetching movie slides", error);
    }
  };
  useEffect(() => {
    fetchMovieSlide();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slide.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slide]);

  return (
    <div className="relative w-full h-140">
      {slide.length > 0 && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w780${slide[index]?.file_path}`}
            className="w-full h-full object-cover transition-opacity duration-2000"
            alt="Movie backdrop"
          />

          {/* Black overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        </>
      )}
    </div>
  );
}

export default MovieSlide;
