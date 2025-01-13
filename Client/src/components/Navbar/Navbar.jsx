import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Redux state for login
  const isAdmin = useSelector((state) => state.auth.isAdmin); // Redux state for admin
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle state

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Dispatch Redux logout action
    dispatch(authActions.logout());

    // Close the mobile menu
    setIsOpen(false);

    // Redirect to the login page
    navigate("/login");
  };

  // Check if the current route is the admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  const links = [
    ...(isAdmin
      ? [{ title: "Dashboard", link: "/admin-dashboard" }]
      : [
          ...(isLoggedIn ? [{ title: "Profile", link: "/profile" }] : []),
          { title: "Home", link: "/" },
          { title: "Resources", link: "/resources" },
        ]),
  ];

  return (
    <div className="bg-zinc-800 text-white px-8 py-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img className="h-10" src={assets.logo} alt="Logo" />
          <h1 className="text-2xl font-semibold ml-2">LegalRead</h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-8">
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="text-xl px-4 py-2 hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>
          ))}
          {!isAdminRoute && !isLoggedIn && (
            <>
              <Link
                to="/login"
                className="text-xl px-6 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-xl px-6 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-xl px-6 py-2 bg-red-500 rounded hover:bg-red-600 duration-300"
            >
              Log Out
            </button>
          )}
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
                className="text-lg px-6 py-2 hover:text-blue-500 transition-all duration-300"
                key={i}
                onClick={toggleMenu} // Close menu after clicking a link
              >
                {item.title}
              </Link>
            ))}
            {!isAdminRoute && !isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="w-full max-w-xs text-lg px-6 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300 text-center"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="w-full max-w-xs text-lg px-6 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300 text-center"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="w-full max-w-xs text-lg px-6 py-2 bg-red-500 rounded hover:bg-red-600 duration-300 text-center"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
