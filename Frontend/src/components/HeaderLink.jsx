import { FaSearch } from 'react-icons/fa';

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center justify-center space-x-12 mt-4 w-full px-5">
      <div className="flex items-center space-x-12">
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          NEWS
        </a>
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          SPORTS
        </a>
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          OPINION
        </a>
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          LITERARY
        </a>
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          FEATURES
        </a>
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          SPECIALS
        </a>
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          ART
        </a>
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          ABOUT
        </a>
        <a href="#" className="text-cyan-800 font-medium hover:text-gray-200 transition-colors duration-200">
          CONTACT US
        </a>
        <FaSearch className="text-cyan-800 text-xl cursor-pointer hover:text-gray-200 transition-colors duration-200" />
      </div>
     
    </nav>
  );
}
