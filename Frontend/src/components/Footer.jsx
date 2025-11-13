import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import Bgfooter from '../assets/images/bgfooter.png'; // Use Footer.png as background image
import LaVerdadHerald from '../assets/images/la verdad herald.svg';

function Footer() {
  const navLinks = [
    { name: 'NEWS', path: '/news' },
    { name: 'SPORTS', path: '/sports' },
    { name: 'OPINION', path: '/opinion' },
    { name: 'LITERARY', path: '/literary' },
    { name: 'FEATURES', path: '/features' },
    { name: 'SPECIALS', path: '/specials' },
    { name: 'ART', path: '/art' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  // Split links into 3 columns for the grid
  const linksCol1 = navLinks.slice(0, 3);
  const linksCol2 = navLinks.slice(3, 6);
  const linksCol3 = navLinks.slice(6, 9);

  return (
    <footer 
      className="text-slate-200 justify-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(6, 182, 212, 0.4), rgba(0, 0, 0, 0.4)), url(${Bgfooter})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-6 py-16">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 justify-center">
            <div className="flex items-center space-x-4 mb-4 justify-center">
              <img src={logo} alt="La Verdad Herald Logo" className="h-16 w-16" />
              <img src={LaVerdadHerald} alt="La Verdad Herald" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              The LA VERDAD HERALD is the Official Higher Education
              Student Publication of La Verdad Christian College, Inc.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-3 gap-4">
              {/* Column 1 of links */}
              <div className="space-y-3">
                {linksCol1.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block text-lg font-semibold text-white hover:text-cyan-400 transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              {/* Column 2 of links */}
              <div className="space-y-3">
                {linksCol2.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block text-lg font-semibold text-white hover:text-cyan-400 transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              {/* Column 3 of links */}
              <div className="space-y-3">
                {linksCol3.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block text-lg font-semibold text-white hover:text-cyan-400 transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter Subscription */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold text-white mb-3">
              Never miss a story.
            </h4>
            <p className="text-sm text-slate-300 mb-4">
              Subscribe for email updates from La Verdad Herald.
            </p>
            <form className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Email address"
                className="w-full grow p-3 rounded-l-md text-white-500 bg-slate-700 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                aria-label="Email Address"
              />
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 p-3 rounded-r-md font-bold text-white uppercase tracking-wider transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-slate-700 my-10" />

        {/* Bottom Section: Social Icons & Copyright */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} La Verdad Herald - La Verdad Christian College Apalit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;