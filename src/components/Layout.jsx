import Navbar from './Navbar'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar';

export default function Layout({ children,genres }) {
  return (
    <div className="min-h-screen bg-gray-800 dark:bg-gray-900">
      <Navbar /> {/* Your Navbar component */}
      
      
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Container */}
        <div className="md:w-1/4">
          <Sidebar genres={genres}/>
        </div>

        {/* Main Content Area */}
        <main className="w-full md:w-3/4">
          {children} {/* This will be your game list, detail page, etc. */}
        </main>
      </div>
    </div>
  );
}

