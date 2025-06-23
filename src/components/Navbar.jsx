import { useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router'; // Import NavLink

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === "string" && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
            setSearch("");
            setAriaInvalid(null);
        } else {
            setAriaInvalid(true);
        }
    };

  const navItems = [
    { to: '/', label: 'Home' }, 
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
  ];



  // Helper function to apply dynamic classes for NavLink's active state
  const getNavLinkClass = ({ isActive }) =>
    `text-base lg:text-lg font-medium px-2 py-1 rounded transition-colors duration-200 ` +
    (isActive
      ? 'bg-blue-600 text-white shadow-md' // Active state styles
      : 'text-gray-300 hover:text-white hover:bg-gray-700'); // Inactive state styles

  const getMobileNavLinkClass = ({ isActive }) =>
    `block text-lg font-medium px-3 py-2 rounded transition-colors duration-200 ` +
    (isActive
      ? 'bg-blue-600 text-white shadow-md' // Active state styles for mobile
      : 'text-gray-300 hover:text-white hover:bg-gray-600'); // Inactive state styles for mobile

  return (
    <header className="bg-gray-800 shadow-lg py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center ">
          {/* Logo - Still using <a> if it's always linking to root, or NavLink if it's part of active routing */}
          <NavLink
            to="/" // Changed to NavLink
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-purple-500 hover:text-blue-400 transition-colors flex-shrink-0 
            "
          >
            GameRank
          </NavLink>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block relative w-1/3 max-w-md mx-4">
          
            <input
             type="text"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-invalid={ariaInvalid ? "true" : "false"}
                placeholder="Cerca giochi"
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 transition-all"
            />
          
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4 lg:space-x-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to} // Use 'to' prop
                    className={getNavLinkClass} // Pass the function to className
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger Icon */}
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close Icon */}
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
        >
          <div className="bg-gray-700 rounded-lg p-4 space-y-4">
            {/* Mobile Search Bar - Conditionally hidden on large screens, though it's already in the main header div with lg:hidden */}
            <div className="relative"> {/* Removed lg:hidden as it's mobile specific now */}
              <input
                type="text"
                placeholder="Cerca giochi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleSearch(e)}
                className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-500 transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>

            {/* Mobile Navigation Links */}
            <nav>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.to} // Use 'to' prop
                      className={getMobileNavLinkClass} // Use mobile-specific class function
                      onClick={() => setIsMenuOpen(false)} // Close menu on click
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}