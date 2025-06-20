import { useNavigate } from "react-router";
import moviePoster from "./assets/movie-poster.jpg";
import { BiSolidCameraMovie } from "react-icons/bi";

function Banner() {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${moviePoster})` }}
      className="w-full h-screen bg-black/70 bg-blend-multiply text-white"
    >
      <div className="flex items-center gap-2 h-24 p-5">
        <BiSolidCameraMovie className="text-4xl" />
        <h1 className="font-Raleway text-4xl font-bold">Cineva</h1>
      </div>
      <div className="flex flex-col justify-center w-full h-[90%] p-20">
        <div className="flex flex-col w-2/3">
          <p className="flex items-center justify-center font-Bebas text-4xl md:text-5xl leading-tight">
            "Lights, Camera, Action! Dive into a world of movies—anytime, anywhere!"
          </p>
        </div>
        <button
          
          className="font-Raleway bg-yellow-400 hover:bg-yellow-500 hover:outline-2 hover:outline-white 
            w-36 py-3 px-2 mt-5 rounded-full font-bold cursor-pointer"
            onClick={()=>navigate("/Home")}
        >
          Watch Free
        </button>
      </div>
    </div>
  );
}

export default Banner;