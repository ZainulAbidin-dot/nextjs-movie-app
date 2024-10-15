import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react';
import { useRef } from 'react';

export function MovieCarousel({ title, movies }) {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="relative">
        <div
          className="flex space-x-4 overflow-x-hidden pb-4"
          ref={carouselRef}
        >
          {movies.map((movie, index) => (
            <div>
                <div key={index} className="flex-none w-48 relative group">
                    <Image
                        src={movie.image}
                        alt={movie.title}
                        width={300}
                        height={400}
                        className="rounded-md object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="text-white text-center">
                        <div className="flex justify-center space-x-2">
                            <button className="bg-teal-800 text-stone-200 p-2 rounded-full hover:bg-opacity-80 transition-colors">
                            <Play size={26} />
                            </button>
                            {/* <button className="bg-gray-500 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition-colors">
                            <Plus size={16} />
                            </button> */}
                        </div>
                        </div>
                    </div>
                </div>

                <h3 className="font-semibold mb-2">{movie.title}</h3>
                <div className="flex justify-between my-[-10px] text-gray-500 text-sm">
                    <h5 className="font-normal mb-2">{movie.year}</h5>
                    <h5 className="font-normal outline outline-1 outline-gray-500 rounded-sm px-2 mb-2">{movie.duration}min</h5>
                </div>
                {/* <h3 className="font-semibold mb-2">Ratings: {movie.rating}</h3> */}
            </div>
          ))}
        </div>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
          onClick={scrollLeft}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
          onClick={scrollRight}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
