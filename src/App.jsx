import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import { useState, useEffect } from 'react'
import SearchPage from './pages/searchpage'
import GamePage from './pages/GamePage'
import GenrePage from './pages/genrepage'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import SessionProvider from './context/SessionProvider'
import AccountPage from './pages/account'
import FavoritesProvider from './context/FavoritesProvider'
import ProfilePage from './pages/profile'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsAndCookies from './components/TermsAndCookies'


const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function App() {

  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(`https://api.rawg.io/api/genres?key=${RAWG_API_KEY}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGenresList(data.results);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      setError(null);
      try {
        let url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${currentPage}&page_size=30`;
        if (genres) {
          url += `&genres=${genres}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / 40));
      } catch (err) {
        console.error("Failed to fetch games:", err);
        setError("Failed to load games,try again later!!.");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [currentPage, genres]);
  return (
    <><SessionProvider>
      <FavoritesProvider>
        <Router>
          <Layout genres={genresList}>
            <Routes>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/" element={<Home games={games} />} />
              <Route path="/genre/:genre" element={<GenrePage />} />
              <Route path="/games/:slug/:id" element={<GamePage />} />
              <Route path="/about" element={<GenrePage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/termsandcookies" element={<TermsAndCookies />} />

            </Routes>
          </Layout>
        </Router>
      </FavoritesProvider>
    </SessionProvider>
    </>
  )
}

export default App
