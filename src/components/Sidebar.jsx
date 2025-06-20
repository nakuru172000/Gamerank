import { Link } from "react-router";

export default function Sidebar({ genres }) {
  return (
    <div className="px-4 py-8 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/4">
        <button 
          data-drawer-target="default-sidebar" 
          data-drawer-toggle="default-sidebar" 
          aria-controls="default-sidebar" 
          type="button" 
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

        <h2 className="text-center text-xl font-semibold mb-4">Generi:</h2>
        <aside id="default-sidebar" className="top-20 left-0 z-40 w-64 transition-transform sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-500 rounded-2xl dark:bg-gray-800">
            {!genres ? (
              <p className="text-white text-center">Loading genres...</p>
            ) : genres && genres.length > 0 ? (
              <ul className="space-y-2 font-medium rounded-3xl">
                {genres.map((genre) => (
                  <li 
                    key={genre.id} 
                    className="cursor-pointer hover:bg-gray-400 transition-colors duration-200 dark:hover:bg-amber-700 p-2 rounded text-white"
                  >
                    <Link 
                      to={`/genre/${genre.slug}`} 
                      className="block w-full h-full"
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white text-center">No genres available</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}




















// import { Link } from "react-router";
// const RAWG_API_KEY = '40bd261d04944873a0081e285d07a619';

// export default function Sidebar({ genres }) {


//   return (


//     <>
//       <div className=" px-4 py-8 flex flex-col md:flex-row gap-8 ">
//         <div className="md:w-1/4">
//           <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//             <span className="sr-only">Open sidebar</span>
//             <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//             </svg>
//           </button>

// <h2 className="text-center">Generi:</h2>
//           <aside id="default-sidebar" className=" top-20 left-0 z-40 w-64  transition-transform  sm:translate-x-0" aria-label="Sidebar">
//             <div className="h-full px-3 py-4 overflow-y-auto bg-gray-500 rounded-2xl dark:bg-gray-800">
//             <ul className="space-y-1 font-medium  rounded-3xl">
//                                 {genres && genres.results.map((genre) => (
//                                     <li key={genre.id} className="cursor-pointer hover:bg-gray-400 tracking-in-expand dark:hover:bg-amber-700 p-2 rounded text-white">
//                                         <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
//                                     </li>
//                                 ))}
//                             </ul>
//             </div>
//           </aside>
//         </div>
//       </div>


//     </>
//   );
// }