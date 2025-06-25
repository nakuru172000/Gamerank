import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function Sidebar({ genres }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px breakpoint for tablet
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
          className="md:hidden 
           fixed top-4 left-4 z-50 p-2 rounded-md text-white shadow-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 transform' : 'static'}
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        w-64 text-white transition-transform duration-300 ease-in-out
        z-40 h-screen overflow-y-auto
        ${isMobile ? 'shadow-xl' : ''}
      `}>
        <div className="p-4">
          
          <div className="nearblack rounded-xl p-3">
            <h2 className="text-xl font-semibold mb-4 text-center">Generi :</h2>
            {!genres ? (
              <p className="text-gray-200 text-center py-4">Loading genres...</p>
            ) : genres.length > 0 ? (
              <ul className="space-y-2">
  {genres.map((genre, index) => (
    <li key={genre.id} className="">
      <Link
        to={`/genre/${genre.slug}`}
        className="block p-2  text-gray-100 border-b-2 border-transparent hover:border-amber-400 transition-colors duration-200 tracking-in-expand"
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

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed  inset-0 bg-opacity-50 z-9999"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}