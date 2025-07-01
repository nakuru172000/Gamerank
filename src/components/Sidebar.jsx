import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function Sidebar({ genres }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); 
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="relative">
      {/* Mobile/Tablet Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden 
           fixed top-14 left-4 z-50 p-2 rounded-md text-white shadow-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? (
           <svg 
  xmlns="http://www.w3.org/2000/svg" 
  className="h-6 w-15 fixed top-18 left-4 rounded-md hover:text-gray-300 text-black bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors" 
  fill="none" 
  viewBox="0 0 24 24" 
  stroke="currentColor"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth={2} 
    d="M9 5l7 7-7 7" 
  />
</svg>
          ) : (
           <svg 
  xmlns="http://www.w3.org/2000/svg" 
  className="h-6 w-15 fixed top-18 left-4 rounded-md hover:text-gray-300 text-black bg-amber-500  hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors" 
  fill="none" 
  viewBox="0 0 24 24" 
  stroke="currentColor"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth={2} 
    d="M15 19l-7-7 7-7" 
  />
</svg>
          )}
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-20 left-0 transform' : 'static'}
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        w-64 text-white transition-transform duration-300 ease-in-out
        z-40  overflow-y-auto scrollbar-hide
        ${isMobile ? '' : ''}
      `}>
        <div className="p-4 mb-5 ">
          
          <div className="nearblack rounded-xl ps-1  shadow-lg shadow-amber-900">
            <h2 className="text-xl font-semibold mb-2 text-center">Genres :</h2>
            {!genres ? (
              <p className="text-gray-200 text-center py-4">Loading genres...</p>
            ) : genres.length > 0 ? (
              <ul className="space-y-1 lg:space-y-3">
  {genres.map((genre, index) => (
    <li key={genre.id} className="" name="link">
      <Link name="link"
        to={`/genre/${genre.slug}`}
        className="   text-gray-100 border-b-3 md:inline block border-transparent rounded-2xl px-2 md:px-4 hover:border-amber-400 transition-colors duration-200 tracking-in-expand"
        onClick={() => isMobile && setIsOpen(false)}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {genre.name}
      </Link>
    </li>
  ))}
</ul>
            ) : (
              <p className="text-white text-center py-4">No genres available</p>
            )}
          </div>
        </div>
      </div>

      {/* mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed  bg-opacity-50 z-9999"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}