import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "Resources", link: "/resources" },
    { title: "Profile", link: "/profile" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-zinc-800 text-white px-8 py-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img className="h-10" src={assets.logo} alt="Logo" />
          <h1 className="text-2xl font-semibold ml-2">LegalRead</h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-6">
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>
          ))}
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <img
            src={isOpen ? assets.close : assets.menu}
            alt="Menu Icon"
            className="h-8 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 bg-zinc-700 p-4 rounded-lg lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((item, i) => (
              <Link
                to={item.link}
                className="hover:text-blue-500 transition-all duration-300"
                key={i}
                onClick={toggleMenu} // Close menu on link click
              >
                {item.title}
              </Link>
            ))}

            {/* Log In and Sign Up Buttons */}
            <div className="flex flex-col gap-2 items-center">
              <Link
                to="/login"
                className="w-full max-w-xs px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300 text-center"
                onClick={toggleMenu}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="w-full max-w-xs px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300 text-center"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
