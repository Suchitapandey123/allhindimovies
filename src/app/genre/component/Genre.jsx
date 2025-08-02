// app/genre/page.js
import Link from "next/link";

import moviesData from "../../../data/movies.json";
import { genresConfig } from "../../../utils/genresConfig";
export default function GenrePage() {
  const genres = moviesData.genres;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Browse by Genre</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genres.map((genre) => {
          const IconComponent = genreIcons[genre] || genreIcons["All"];
          const colorClass = genreColors[genre] || genreColors["All"];
          
          return (
            <Link
              key={genre}
              href={`/genre/${genre.toLowerCase()}`}
              className="group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`p-3 rounded-full mb-3 bg-opacity-20 ${colorClass.replace('text', 'bg')} group-hover:bg-opacity-30 transition-all`}>
                <IconComponent size={24} className={colorClass} />
              </div>
              <h3 className="font-medium text-center">{genre}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}