import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer';
import BackToTop from './BackToTop';
import { FaArrowUp } from 'react-icons/fa';

export default function Layout({ children,genres }) {
  return (
    <div className="min-h-screen max-w-screen">
      <div className='sticky top-0 z-50'><Navbar /> 
      </div>
      
      
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
      <BackToTop />
      <Footer/>
    </div>
  );
}

