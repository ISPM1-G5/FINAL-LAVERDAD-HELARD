import { FaUser } from 'react-icons/fa';
import Navigation from './HeaderLink';

function Header() {
  return (
    <header
      className="flex w-full items-center px-8 py-4 bg-cover bg-right"
      style={{
        backgroundImage: `linear-gradient(to right, #2a5a82 60%, rgba(42,90,130,0.7)), url('/src/assets/images/header.png')`
      }}
    >

      {/* Invisible spacer to push content to center */}
      <div className="flex-1"></div>

      {/* === CENTERED CONTENT === */}
      <div className="flex flex-col items-center gap-2">
        {/* Images */}
        <div className="flex items-center gap-6">
          <img
            src="/src/assets/images/logo.svg"
            alt="La Verdad Logo"
            className="h-[70px] w-auto"
          />

          <img
            src="/src/assets/images/la verdad herald.svg"
            alt="La Verdad Herald"
            className="h-[50px] w-auto"
          />
        </div>
      </div>

      {/* Invisible spacer to balance the layout */}
      <div className="flex-1"></div>

      {/* === RIGHT SIDE === */}
      <div className="flex items-center">
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/90 shadow-md">
          {/* Uses the blue color from the gradient */}
          <FaUser className="text-2xl text-[#2a5a82]" />
        </div>
      </div>


    </header>
  );
}

export default Header;
