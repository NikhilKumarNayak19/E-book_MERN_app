//import React from "react";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "Resources",
      link: "/resources",
    },

    {
      title: "profile",
      link: "/profile",
    },
    {
      title: "Contact Us",
      link: "/contact-us",
    },
  ];

  return (
    <div className="flex bg-zinc-800 text-white px-8 py-2 items-center justify-between">
      <div className="flex items-center">
        <img className="h-24 me-0" src={assets.logo} alt="" />
        <h1 className="text-2xl font-semibold">LegalRead</h1>
      </div>
      <div className="nav-links-legalread flex items-center gap-4">
        <div className="flex gap-4">
          {links.map((items, i) => (
            <div
              className="hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {items.title}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300">
            LogIn
          </button>
          <button className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 duration-300 ">
            SingnUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;