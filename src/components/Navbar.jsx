import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router';
import SearchBar from './SearchBar';
import { supabase } from '../supabase/supabase-client';
import SessionContext from '../context/SessionContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { session, setSession } = useContext(SessionContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setSession(data.session); // Fixed: set only the session, not the entire data object
    } else { 
      setSession(null); 
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        alert('Error signing out: ' + error.message);
      } else {
        // Successfully signed out
        setSession(null);
        setIsDropdownOpen(false);
        navigate('/'); // Redirect to home page
        // Optional: show success message
        // alert("Successfully signed out!");
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err);
      alert('An unexpected error occurred while signing out');
    }
  }

  useEffect(() => {
    getSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [])

  const handleSearch = (event) => {
    event.preventDefault();
    if (typeof search === "string" && search.trim().length !== 0) {
      navigate(`/search?query=${search}`);
      setSearch("");
    }
  };

  const navItems = [
    { to: '/', label: 'Home' },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `text-base lg:text-lg font-medium px-2 py-1 rounded transition-colors duration-200 ` +
    (isActive
      ? 'bg-amber-400 text-black shadow-md'
      : 'text-gray-300 hover:text-white hover:bg-gray-700');

  const getMobileNavLinkClass = ({ isActive }) =>
    `block text-lg font-medium px-3 py-2 rounded transition-colors duration-200 ` +
    (isActive
      ? 'bg-amber-500 text-black shadow-md'
      : 'text-gray-300 hover:text-white hover:bg-gray-600');

  const getUserName = () => {
    return session?.user?.user_metadata?.first_name ||
      session?.user?.email?.split('@')[0] ||
      'User';
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="bg-black shadow-lg py-4 shadow-amber-900 sticky">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <NavLink
            to="/"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-400 hover:text-amber-600 transition-colors flex-shrink-0"
          >
            GameRank
          </NavLink>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block relative w-1/3 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={getNavLinkClass}
              >
                {item.label}
              </NavLink>
            ))}

            {session ? (
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2"
                >
                  <span>Hey {getUserName()}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <NavLink
                      to="/account"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" className={getNavLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={getNavLinkClass}>
                  Register
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-black hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
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
          className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="nearblack rounded-lg p-4 space-y-4 shadow-amber-900 shadow-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleSearch(e)}
                className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-900 text-gray-200 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-gray-500 transition-all"
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
                      to={item.to}
                      className={getMobileNavLinkClass}
                      onClick={() => setIsMenuOpen(false)}
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