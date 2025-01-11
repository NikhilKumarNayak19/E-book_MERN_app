import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { use } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "Resources", link: "/resources" },
    { title: "Contact Us", link: "/contact-us" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  const isLoggedIn= useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) (
    links.splice(2, 2)
  )
  if (isLoggedIn === true && role === "user") (
    links.splice(4, 1)
  )
  if (isLoggedIn === true && role === "admin") (
    links.splice(3, 1)
  )
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [MobileNav, setMobileNav] = useState("hidden");
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
        <div className="nav-links-LegalReads block md:flex items -center gap-4"></div>
        <div className="hidden lg:flex gap-6">
          {links.map((item, i) => (
            <div className = "flex items-center">
              {item.title === "Profile" || item.title === "Admin Profile" ? (
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
            {/* Login and Sign Up */}
            <Link
              to="/login"
              className="w-40 self-center px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300"
              onClick={toggleMenu}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="w-40 self-center px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
