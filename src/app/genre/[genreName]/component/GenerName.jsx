// app/genre/[genreName]/page.js
import { genresConfig } from "../../../utils/genresConfig";
import moviesData from "../../../../data/movies.json";
import { Star } from "lucide-react"; 
import Link from "next/link";
export default function GenreDetailPage({ params }) {
  // Safely access genreName with fallback
  const genreSlug = params?.genreName || 'all';
  
  // Convert URL parameter to proper genre name
  const genreName = genreSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get icon and color from config
   const { icon: IconComponent, color } = genresConfig[genreName] || genresConfig["All"];
  
  // Filter movies with fallback for undefined genreName
  const filteredMovies = genreName === "All" 
    ? moviesData.movies 
    : moviesData.movies.filter(movie => 
        movie.genre?.some(g => 
          g.toLowerCase().replace(/\s+/g, '-') === genreSlug.toLowerCase()
        )
      ) || [];
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Genre Header */}
      <div className="flex items-center mb-8">
        <div className={`p-3 rounded-full mr-4 ${color.replace('text', 'bg')} bg-opacity-20`}>
          <IconComponent size={28} className={color} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{genreName} Movies</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
          </p>
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.image}
                  alt={`${movie.title} poster`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/placeholder-movie.svg";
                  }}
                />
                
                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                  <Star className="text-yellow-400 mr-1" size={12} />
                  <span>{movie.rating}</span>
                </div>
              </div>
              
              {/* Movie Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{movie.year}</span>
                  <span className="text-gray-500 dark:text-gray-400">{movie.duration}</span>
                </div>
              </div>
              
              {/* Link to movie details */}
              <Link 
                href={`/movies/${movie.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View details of ${movie.title}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">No {genreName} movies found</h2>
            <p className="text-gray-500 mb-6">
              We couldn't find any movies in this genre. Try browsing our full collection.
            </p>
            <Link 
              href="/movies"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Browse All Movies
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}